# Presence & Resuscitation Optimization

## Problem Statement
Users appear "offline" (zombie status) after:
1. Backgrounding the iOS/Android app
2. Network interruptions
3. Device sleep
4. Multiple sessions from same user creating "ghost" entries

## Root Causes

### 1. Server-Side Issues
- `onlineUsers` Map is keyed by `socket.id`, not `user.id`
- When a user reconnects, they get a new `socket.id` but old entry remains
- No cleanup of stale socket entries for the same user

### 2. Client-Side Issues
- `join` event only emitted on initial `connect`, not on `reconnect`
- No listeners for app foreground/background state changes
- No aggressive reconnection strategy when app returns from background

## Implementation Plan

### Server-Side Changes (apps/api/src/chat/chat.gateway.ts)

#### 1. Add User ID Tracking
```typescript
// Add new Map to track userId → socketId mapping
private userSocketMap = new Map<string, string>(); // userId → current socket.id
private onlineUsers = new Map<string, { user: User; tenantId: string; tenantSlug: string; rooms: string[] }>();
```

#### 2. Update handleJoin with Deduplication
```typescript
@SubscribeMessage('join')
async handleJoin(
    @ConnectedSocket() socket: CustomSocket,
    @MessageBody() data: { user: User; tenantSlug: string },
) {
    const { user, tenantSlug } = data;
    if (!user || !tenantSlug) return;

    this.logger.log(`[handleJoin] User ${user.id} (${user.alias}) joining tenant ${tenantSlug} with socket ${socket.id}`);

    // Fetch tenant
    const tenant = await this.tenantService.findBySlug(tenantSlug);
    if (!tenant) {
        this.logger.warn(`[handleJoin] Tenant ${tenantSlug} not found`);
        return;
    }

    // CRITICAL: Check if this user is already online with a DIFFERENT socket
    const existingSocketId = this.userSocketMap.get(user.id);
    if (existingSocketId && existingSocketId !== socket.id) {
        this.logger.warn(`[handleJoin] User ${user.id} has existing socket ${existingSocketId}, removing old entry`);

        // Clean up old socket entry
        const oldUserData = this.onlineUsers.get(existingSocketId);
        if (oldUserData) {
            this.onlineUsers.delete(existingSocketId);
            this.logger.log(`[handleJoin] Removed ghost socket ${existingSocketId} for user ${user.id}`);
        }

        // Disconnect the old socket if it still exists
        const oldSocket = this.server.sockets.sockets.get(existingSocketId);
        if (oldSocket) {
            this.logger.log(`[handleJoin] Force-disconnecting old socket ${existingSocketId}`);
            oldSocket.disconnect(true);
        }
    }

    // Update tracking maps
    this.userSocketMap.set(user.id, socket.id);

    // Initialize user entry
    const userEntry = { user, tenantId: tenant.id, tenantSlug, rooms: [] as string[] };
    this.onlineUsers.set(socket.id, userEntry);

    // Persist user profile
    try {
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.alias,
                status: (user as any).status || null,
                image: (user as any).image || null,
            },
        });
        this.logger.debug(`[handleJoin] Persisted profile for ${user.id}`);
    } catch (error: any) {
        this.logger.error(`[handleJoin] Failed to persist profile: ${error.message}`);
    }

    // Update socket data
    if (socket.data.user) {
        socket.data.user.tenantId = tenant.id;
    } else {
        socket.data.user = { id: user.id, alias: user.alias, tenantId: tenant.id };
    }

    // Join rooms
    socket.join(`tenant:${tenantSlug}`);
    socket.join(user.id); // Private room
    socket.data.tenantSlug = tenantSlug;

    // Join all tenant rooms
    if (tenant?.rooms) {
        const roomIds = tenant.rooms.map((r: any) => r.id);
        this.logger.log(`[handleJoin] User ${user.id} joining ${roomIds.length} rooms`);
        roomIds.forEach((roomId: string) => {
            socket.join(roomId);
            this.logger.debug(`[handleJoin] User ${user.id} joined room ${roomId}`);
        });
        socket.data.rooms = roomIds;
        userEntry.rooms = roomIds;
    }

    // CRITICAL: Immediately broadcast presence update
    this.logger.log(`[handleJoin] Broadcasting presence for tenant ${tenantSlug}`);
    await this.broadcastPresence(tenantSlug);
}
```

#### 3. Update handleDisconnect
```typescript
handleDisconnect(socket: CustomSocket) {
    this.logger.log(`[handleDisconnect] Socket ${socket.id} disconnected`);

    const userData = this.onlineUsers.get(socket.id);
    if (userData) {
        // Remove from online users
        this.onlineUsers.delete(socket.id);

        // Remove from user-socket tracking ONLY if this is the current socket
        const currentSocketId = this.userSocketMap.get(userData.user.id);
        if (currentSocketId === socket.id) {
            this.userSocketMap.delete(userData.user.id);
            this.logger.log(`[handleDisconnect] Removed user ${userData.user.id} from tracking`);
        } else {
            this.logger.warn(`[handleDisconnect] User ${userData.user.id} has different active socket, not removing from tracking`);
        }

        // Broadcast presence update
        this.broadcastPresence(userData.tenantSlug);
    }
}
```

#### 4. Configure WebSocket Gateway with Shorter Ping Timeout
```typescript
@WebSocketGateway({
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://app.meetlocal.app',
            'capacitor://localhost',
        ],
        credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 10000,    // 10 seconds (detect dead connections faster)
    pingInterval: 5000,    // 5 seconds (more frequent heartbeats)
})
```

### Client-Side Changes (apps/web/components/ChatInterface.tsx)

#### 1. Add Capacitor App State Listener
```typescript
import { App as CapApp } from '@capacitor/app';

// Add near the top of component
const [appState, setAppState] = useState<'active' | 'background'>('active');

// Add useEffect for app state monitoring
useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const stateListener = CapApp.addListener('appStateChange', ({ isActive }) => {
        const newState = isActive ? 'active' : 'background';
        console.log(`[App State] Changed to: ${newState}`);
        setAppState(newState);

        if (isActive && socket && currentUser) {
            console.log('[App State] App foregrounded, checking socket connection...');

            if (!socket.connected) {
                console.log('[App State] Socket disconnected, reconnecting...');
                socket.connect();
            } else {
                console.log('[App State] Socket already connected, re-identifying...');
                // Force re-join to update server-side presence
                socket.emit('join', { user: currentUser, tenantSlug: tenant.slug });
            }
        }
    });

    return () => {
        stateListener.remove();
    };
}, [socket, currentUser, tenant.slug]);
```

#### 2. Add Dedicated Join Function
```typescript
// Add this function inside ChatInterface component, before socket connection effect
const joinTenant = useCallback((socket: Socket, user: User, slug: string) => {
    console.log(`[joinTenant] Joining tenant ${slug} as user ${user.id} (${user.alias})`);
    socket.emit('join', { user, tenantSlug: slug });
}, []);
```

#### 3. Update Socket Connection Effect with Reconnect Handler
```typescript
// Update the socket connection useEffect (around line 290)
useEffect(() => {
    if (!currentUser) return;

    // Prevent reconnection if socket is already initialized for this user
    if (socketInitializedRef.current && userIdRef.current === currentUser.id) {
        return;
    }

    // If we have a socket but the user ID changed, update ref and re-join
    if (socketInitializedRef.current && userIdRef.current !== currentUser.id) {
        userIdRef.current = currentUser.id;
        if (socket) {
            joinTenant(socket, currentUser, tenant.slug);
        }
        return;
    }

    let newSocket: Socket;
    let isCleanedUp = false;

    const connect = async () => {
        const sessionData = await authClient.getSession();
        let token = sessionData?.data?.session?.token;

        // Fallback: read cookie directly
        if (!token && typeof document !== 'undefined') {
            const match = document.cookie.match(/better-auth\.session_token=([^;]+)/);
            if (match) token = decodeURIComponent(match[1]);
        }

        newSocket = io(SOCKET_URL, {
            auth: { token },
            query: {
                tenantSlug: tenant.slug,
                userId: currentUser.id,
                userAlias: currentUser.alias
            },
            transports: ['websocket', 'polling'],
            reconnectionAttempts: Infinity, // CHANGED: Never give up reconnecting
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
        });

        // CONNECT event handler
        newSocket.on('connect', () => {
            if (isCleanedUp) return;
            console.log('[Socket] Connected! Socket ID:', newSocket.id);

            setIsConnected(true);
            socketInitializedRef.current = true;
            userIdRef.current = currentUser.id;

            // Join tenant on connect
            joinTenant(newSocket, currentUser, tenant.slug);
        });

        // RECONNECT event handler (fired after disconnect → reconnect)
        newSocket.on('reconnect', (attemptNumber) => {
            if (isCleanedUp) return;
            console.log(`[Socket] Reconnected after ${attemptNumber} attempts!`);

            // Force re-join to restore server-side presence
            joinTenant(newSocket, currentUser, tenant.slug);
        });

        // RECONNECT_ATTEMPT event handler
        newSocket.on('reconnect_attempt', (num) => {
            console.log(`[Socket] Reconnection attempt #${num}`);
        });

        // CONNECT_ERROR event handler
        newSocket.on('connect_error', (err) => {
            console.error('[Socket] Connection error:', err.message, err);
        });

        // Listen for user creation (for NEW anonymous users only)
        newSocket.on('userCreated', (userData: { id: string; alias: string; tenantId: string | null }) => {
            if (isCleanedUp) return;

            console.log('[Socket] User created on server:', userData);

            // Update local user data without triggering reconnection
            const updatedUser = { ...currentUser, id: userData.id, alias: userData.alias };
            userIdRef.current = userData.id;
            setCurrentUser(updatedUser);
            localStorage.setItem('chat_user', JSON.stringify(updatedUser));

            // Join with correct user ID
            joinTenant(newSocket, updatedUser, tenant.slug);
        });

        // Listen for user confirmation (for EXISTING users reconnecting)
        newSocket.on('userConfirmed', (userData: { id: string; alias: string; tenantId: string | null }) => {
            if (isCleanedUp) return;

            console.log('[Socket] User confirmed on server:', userData);
            userIdRef.current = userData.id;

            // Join tenant
            joinTenant(newSocket, currentUser, tenant.slug);
        });

        // DISCONNECT event handler
        newSocket.on('disconnect', (reason) => {
            if (isCleanedUp) return;

            console.log('[Socket] Disconnected:', reason);
            setIsConnected(false);

            // If server initiated disconnect, try to reconnect immediately
            if (reason === 'io server disconnect') {
                console.log('[Socket] Server initiated disconnect, reconnecting...');
                newSocket.connect();
            }
        });

        // All other event handlers (presenceUpdate, newMessage, etc.) remain the same
        // ... (keep existing handlers)

        setSocket(newSocket);
    };

    connect();

    return () => {
        isCleanedUp = true;
        if (newSocket) {
            console.log('[Socket] Cleaning up socket connection');
            newSocket.off(); // Remove all listeners
            newSocket.close();
        }
    };
}, [currentUser, tenant.slug, joinTenant, authClient]);
```

#### 4. Add Network State Monitoring (Optional)
```typescript
import { Network } from '@capacitor/network';

useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const networkListener = Network.addListener('networkStatusChange', (status) => {
        console.log('[Network] Status changed:', status);

        if (status.connected && socket && !socket.connected && currentUser) {
            console.log('[Network] Network restored, reconnecting socket...');
            socket.connect();
        }
    });

    return () => {
        networkListener.remove();
    };
}, [socket, currentUser]);
```

## Testing Checklist

### Manual Tests

#### 1. Background Test (iOS/Android)
- [ ] Open app on device 1, verify you appear online on device 2
- [ ] Background the app on device 1 for 30 seconds
- [ ] Foreground the app on device 1
- [ ] Verify you immediately appear online on device 2

#### 2. Network Drop Test
- [ ] Connect to WiFi
- [ ] Open app, verify online status
- [ ] Turn off WiFi for 10 seconds
- [ ] Turn WiFi back on
- [ ] Verify socket reconnects and presence updates

#### 3. Duplicate Session Test
- [ ] Open app in browser tab 1 with user A
- [ ] Open app in browser tab 2 with same user A
- [ ] Verify only ONE "online" status appears (not two)
- [ ] Close tab 1
- [ ] Verify user A still appears online (from tab 2)

#### 4. Extended Background Test
- [ ] Background app for 5 minutes (simulate iOS killing socket)
- [ ] Foreground app
- [ ] Verify socket reconnects within 2 seconds
- [ ] Verify presence updates immediately

### Automated Tests (Optional)

```typescript
// apps/api/src/chat/chat.gateway.spec.ts
describe('ChatGateway - Presence Resuscitation', () => {
  it('should remove ghost socket when user reconnects', async () => {
    const user = { id: '123', alias: 'Test User' };

    // First connection
    const socket1 = await connect(user);
    expect(gateway.onlineUsers.size).toBe(1);

    // Second connection (same user, new socket)
    const socket2 = await connect(user);

    // Should only have ONE online user entry
    expect(gateway.onlineUsers.size).toBe(1);

    // Old socket should be disconnected
    expect(socket1.connected).toBe(false);
    expect(socket2.connected).toBe(true);
  });

  it('should restore presence immediately after reconnect', async () => {
    const user = { id: '123', alias: 'Test User' };
    const socket = await connect(user);

    // Simulate disconnect
    socket.disconnect();
    await delay(100);

    // Reconnect
    socket.connect();
    socket.emit('join', { user, tenantSlug: 'test' });

    // Should broadcast presence immediately
    const presenceUpdate = await waitForEvent(socket, 'presenceUpdate');
    expect(presenceUpdate.onlineIds).toContain('123');
  });
});
```

## Performance Considerations

### Server-Side
- `userSocketMap` adds O(1) lookup for user deduplication
- `broadcastPresence` complexity remains O(n) where n = online users in tenant
- Shorter `pingTimeout` (10s) increases CPU usage slightly but improves responsiveness

### Client-Side
- App state listener adds minimal overhead
- Network listener adds minimal overhead
- Reconnection with `Infinity` attempts prevents permanent disconnects but could cause battery drain if server is unreachable

## Monitoring

### Server Logs to Watch
```bash
# Watch for ghost socket cleanup
grep "Removed ghost socket" /path/to/api/logs

# Watch for reconnections
grep "handleJoin" /path/to/api/logs | grep "joining tenant"

# Watch for presence broadcasts
grep "Broadcasting presence" /path/to/api/logs
```

### Client Logs to Watch (iOS/Android)
```bash
# iOS (Xcode Console)
# Look for:
# "[App State] App foregrounded, checking socket connection..."
# "[Socket] Reconnected after X attempts!"
# "[Socket] Connected! Socket ID: xxx emitting join..."

# Android (Logcat)
# Same patterns as iOS
```

## Rollback Plan

If issues occur:

1. Revert `handleJoin` changes:
   ```bash
   git revert <commit-hash>
   ```

2. Remove app state listeners:
   ```typescript
   // Comment out the useEffect for CapApp.addListener
   ```

3. Restore original ping settings:
   ```typescript
   @WebSocketGateway({
       // Remove pingTimeout and pingInterval
   })
   ```

## Future Enhancements

1. **Presence Persistence**: Store presence in Redis with TTL for horizontal scaling
2. **Graceful Degradation**: Show "reconnecting..." indicator in UI
3. **Offline Queue**: Queue messages sent while offline, send on reconnect
4. **Typing Indicators**: Real-time typing status (requires similar presence logic)
5. **Read Receipts**: Track message read status per user

## References

- Socket.IO Client Reconnection: https://socket.io/docs/v4/client-api/#reconnection
- Capacitor App Plugin: https://capacitorjs.com/docs/apis/app
- Capacitor Network Plugin: https://capacitorjs.com/docs/apis/network
- NestJS WebSocket Gateway: https://docs.nestjs.com/websockets/gateways
