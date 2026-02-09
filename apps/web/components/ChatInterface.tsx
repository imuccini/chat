'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { User, Message, Tenant } from '@/types';
import { API_BASE_URL, SOCKET_URL, SERVER_URL } from '@/config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sqliteService } from '@/lib/sqlite';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

import { Capacitor } from '@capacitor/core';

// UI Components
import Login from './Login';
import GlobalChat from './GlobalChat';
import BottomNav from './BottomNav';
import UserList from './UserList';
import Settings from './Settings';
import { UnifiedChatList } from './UnifiedChatList';
import { LocalSection } from './LocalSection';
import { useSwipeBack } from '@/hooks/useSwipeBack';
import { useMembership } from '@/hooks/useMembership';
import { useKeyboardAnimation } from '@/hooks/useKeyboardAnimation';
import { useSession, signOut, authClient } from '@/lib/auth-client';

interface ChatInterfaceProps {
    tenant: Tenant;
    initialMessages: Message[];
}

type Tab = 'chats' | 'users' | 'local' | 'settings' | 'admin';
type PrivateChatsMap = Record<string, { peer: User; messages: Message[]; unread: number }>;

// Helper for generating unique IDs (fallback for non-secure contexts)
const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export default function ChatInterface({ tenant, initialMessages }: ChatInterfaceProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const { data: session, isPending: isSessionLoading } = useSession();
    // New state to block UI until we have definitively checked both main and backup session sources
    const [isRestoringSession, setIsRestoringSession] = useState(true);
    const { canManageTenant, isAdmin, isModerator } = useMembership(tenant.id, currentUser?.id);

    // Smooth keyboard animation (native only) - contentStyle goes on content area, NOT header
    const { isKeyboardVisible, contentStyle: keyboardContentStyle } = useKeyboardAnimation();

    // UI State
    const [activeTab, setActiveTab] = useState<Tab>('chats');
    const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
    const [selectedChatPeerId, setSelectedChatPeerId] = useState<string | null>(null);
    // isInputFocused is now driven by keyboard visibility for native, or input focus for web
    const [isInputFocusedLocal, setIsInputFocusedLocal] = useState(false);
    const isInputFocused = Capacitor.isNativePlatform() ? isKeyboardVisible : isInputFocusedLocal;
    const setIsInputFocused = setIsInputFocusedLocal; // Keep setter for web compatibility

    // Data State
    const [onlineUsers, setOnlineUsers] = useState<(User & { socketId: string })[]>([]);
    const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
    const [roomOnlineCounts, setRoomOnlineCounts] = useState<Record<string, number>>({});
    const [privateChats, setPrivateChats] = useState<PrivateChatsMap>({});
    const [isConnected, setIsConnected] = useState(false);

    const queryClient = useQueryClient();

    // Track if this is the first socket connection to prevent reconnection loops
    const socketInitializedRef = useRef(false);
    const userIdRef = useRef<string | null>(null);

    // 1. Initial Data Fetching (Offline-First)
    const { data: messages = (activeRoomId ? [] : initialMessages), isFetching: isFetchingGlobal } = useQuery({
        queryKey: ['messages', 'global', tenant.slug, activeRoomId],
        queryFn: async () => {
            const targetRoomId = activeRoomId;
            const localMessages = await sqliteService.getMessages(true, targetRoomId || undefined);

            try {
                const params = new URLSearchParams({ tenant: tenant.slug });
                if (targetRoomId) params.append('roomId', targetRoomId);
                params.append('tenantId', tenant.id); // Also pass ID for NestJS

                const response = await fetch(`${API_BASE_URL}/api/messages?${params.toString()}`);
                if (response.ok) {
                    const serverMessages: Message[] = await response.json();
                    for (const msg of serverMessages) {
                        await sqliteService.saveMessage(msg, true);
                    }
                    return serverMessages;
                }
            } catch (e) {
                console.warn("Failed to fetch from server, using local data", e);
            }

            return localMessages.length > 0 ? localMessages : (targetRoomId ? [] : initialMessages);
        },
        initialData: activeRoomId ? undefined : initialMessages,
    });

    // 2. Initialize User from Session (Robust Logic)
    useEffect(() => {
        if (isSessionLoading) return;

        const restoreUser = async () => {
            // 1. Check Standard Session
            if (session?.user) {
                const isWaiting = localStorage.getItem('waiting_for_passkey') === 'true';
                if (isWaiting) {
                    setIsRestoringSession(false);
                    return;
                }

                const authUser: User = {
                    id: session.user.id,
                    alias: session.user.name || "User",
                    gender: (session.user as any).gender || "other",
                    status: (session.user as any).status || "",
                    phoneNumber: (session.user as any).phoneNumber,
                    joinedAt: new Date(session.user.createdAt).getTime()
                };

                setCurrentUser(authUser);
                localStorage.setItem('chat_user', JSON.stringify(authUser));
                setIsRestoringSession(false);
                return;
            }

            // 2. Check Backup Session (if standard failed)
            // This handles the case where useSession returns null but server has session (incognito/refresh issues)
            try {
                console.log("[ChatInterface] Checking backup session...");
                const url = Capacitor.isNativePlatform()
                    ? `${SERVER_URL}/api/debug-session`
                    : '/api/debug-session';

                const res = await fetch(url, { credentials: 'include' });
                const data = await res.json();

                if (data?.user) {
                    console.log("[ChatInterface] Restored from backup session!", data.user);
                    const authUser: User = {
                        id: data.user.id,
                        alias: data.user.name || "User",
                        gender: data.user.gender || "other",
                        status: data.user.status || "",
                        phoneNumber: data.user.phoneNumber,
                        joinedAt: new Date(data.user.createdAt).getTime()
                    };
                    setCurrentUser(authUser);
                    localStorage.setItem('chat_user', JSON.stringify(authUser));
                }
            } catch (e) {
                console.warn("[ChatInterface] Backup session check failed", e);
            } finally {
                setIsRestoringSession(false);
            }
        };

        restoreUser();
    }, [session, isSessionLoading]);

    // Restore data on mount & whenever session state changes
    useEffect(() => {
        if (typeof window !== 'undefined' && !isSessionLoading) {
            const savedUser = localStorage.getItem('chat_user');
            if (savedUser && !session) {
                try {
                    const user = JSON.parse(savedUser);
                    console.log("[ChatInterface] Restoring guest user from localStorage:", user.alias);
                    setCurrentUser(user);

                    if (Capacitor.isNativePlatform()) {
                        sqliteService.getPrivateChats(user.id).then(chats => {
                            if (chats.length > 0) {
                                const restoredChats: PrivateChatsMap = {};
                                for (const chat of chats) {
                                    const lastMsg = chat.messages[chat.messages.length - 1];
                                    restoredChats[chat.peerId] = {
                                        peer: {
                                            id: chat.peerId,
                                            alias: lastMsg.senderId === user.id ? 'Chat' : lastMsg.senderAlias,
                                            gender: lastMsg.senderId === user.id ? 'other' : lastMsg.senderGender,
                                            joinedAt: Date.now()
                                        },
                                        messages: chat.messages,
                                        unread: 0
                                    };
                                }
                                setPrivateChats(restoredChats);
                            }
                        });
                    }
                } catch (e) {
                    console.error("[ChatInterface] Failed to restore user:", e);
                }
            }
        }
        document.documentElement.classList.add(`platform-${Capacitor.getPlatform()}`);
    }, [tenant.slug, isSessionLoading, session]);

    // Dynamic background for native
    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;
        const color = (activeTab === 'chats' && (!!activeRoomId || !!selectedChatPeerId)) ? '#e5ddd5' : '#ffffff';
        document.body.style.backgroundColor = color;
        document.documentElement.style.backgroundColor = color;
    }, [activeTab, selectedChatPeerId, currentUser]);

    // Keyboard listeners - now handled by useKeyboardAnimation hook
    // The hook sets KeyboardResize.None and uses keyboardWillShow/Hide for smooth animations

    // 3. Socket Lifecycle - prevent reconnection loops for anonymous users
    useEffect(() => {
        if (!currentUser) return;

        // Prevent reconnection if socket is already initialized for this user
        if (socketInitializedRef.current && userIdRef.current === currentUser.id) {
            return;
        }

        // If we have a socket but the user ID changed (anonymous got new ID from server),
        // don't reconnect - just update the ref
        if (socketInitializedRef.current && userIdRef.current !== currentUser.id) {
            userIdRef.current = currentUser.id;
            return;
        }

        let newSocket: Socket;
        let isCleanedUp = false;

        const connect = async () => {
            const sessionData = await authClient.getSession();
            const token = sessionData?.data?.session?.id;

            console.log("[Socket] Attempting connection to:", SOCKET_URL, "for tenant:", tenant.slug);
            newSocket = io(SOCKET_URL, {
                auth: { token },
                query: {
                    tenantSlug: tenant.slug,
                    userId: currentUser.id,
                    userAlias: currentUser.alias  // Pass alias so server uses it
                },
                transports: ['websocket', 'polling'], // Added polling for better compatibility
                reconnectionAttempts: 10,
                reconnectionDelay: 1000
            });

            newSocket.on('connect', () => {
                if (isCleanedUp) return;
                setIsConnected(true);
                socketInitializedRef.current = true;
                userIdRef.current = currentUser.id;

                // CRITICAL: Re-join on reconnection to restore server-side state (onlineUsers)
                console.log("[Socket] Connected! Socket ID:", newSocket.id, "emitting join...");
                newSocket.emit('join', { user: currentUser, tenantSlug: tenant.slug });
            });

            newSocket.on('connect_error', (err) => {
                console.error("[Socket] Connection error details:", err.message, err);
            });

            newSocket.on('reconnect_attempt', (num) => {
                console.log("[Socket] Reconnection attempt #", num);
            });

            // Listen for user creation (for NEW anonymous users only)
            newSocket.on('userCreated', (userData: { id: string; alias: string; tenantId: string | null }) => {
                if (isCleanedUp) return;

                // Update local user data but don't trigger socket reconnection
                const updatedUser = { ...currentUser, id: userData.id, alias: userData.alias };
                userIdRef.current = userData.id; // Update ref first to prevent reconnection
                setCurrentUser(updatedUser);
                localStorage.setItem('chat_user', JSON.stringify(updatedUser));

                // Now emit join with the correct user ID
                newSocket.emit('join', { user: updatedUser, tenantSlug: tenant.slug });
            });

            // Listen for user confirmation (for EXISTING anonymous users reconnecting)
            newSocket.on('userConfirmed', (userData: { id: string; alias: string; tenantId: string | null }) => {
                if (isCleanedUp) return;

                // No need to update user data, just emit join
                userIdRef.current = userData.id;
                newSocket.emit('join', { user: currentUser, tenantSlug: tenant.slug });
            });

            newSocket.on('disconnect', () => {
                if (isCleanedUp) return;
                setIsConnected(false);
            });

            newSocket.on('presenceUpdate', (data: { users: User[], onlineIds: string[], roomCounts: Record<string, number> }) => {
                setOnlineUsers(data.users as any);
                setOnlineUserIds(data.onlineIds);
                setRoomOnlineCounts(data.roomCounts);
            });

            newSocket.on('newMessage', async (msg: Message) => {
                console.log("[Socket] Received newMessage:", msg);
                await sqliteService.saveMessage(msg, true);
                // Directly update cache for instant display (no HTTP refetch needed)
                const queryKey = ['messages', 'global', tenant.slug, msg.roomId || null];
                queryClient.setQueryData(queryKey, (prev: Message[] | undefined) => {
                    const messages = prev || [];
                    // Avoid duplicates
                    if (messages.some(m => m.id === msg.id)) return messages;
                    return [...messages, msg];
                });
            });

            newSocket.on('messageDeleted', async (data: { messageId: string, roomId?: string }) => {
                await sqliteService.deleteMessage(data.messageId);
                const queryKey = ['messages', 'global', tenant.slug, data.roomId || null];
                queryClient.setQueryData(queryKey, (prev: Message[] | undefined) => (prev || []).filter(m => m.id !== data.messageId));
            });

            newSocket.on('privateMessage', async (msg: Message) => {
                const isMe = msg.senderId === currentUser.id;
                const peerId = isMe ? msg.recipientId! : msg.senderId;
                await sqliteService.saveMessage(msg, false);

                if (!isMe && Capacitor.isNativePlatform()) {
                    Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
                }

                setPrivateChats(prev => {
                    const existing = prev[peerId] || {
                        peer: { id: peerId, alias: isMe ? 'Unknown' : msg.senderAlias, gender: isMe ? 'male' : msg.senderGender, joinedAt: Date.now() },
                        messages: [], unread: 0
                    };
                    if (existing.messages.some(m => m.id === msg.id)) return prev;

                    // Only increment unread if message is from someone else
                    // Also check if we are currently looking at this chat (optional, but good practice if simple)
                    // For now, adhering to strict request: don't increment for self.
                    const newUnread = isMe ? existing.unread : existing.unread + 1;

                    return { ...prev, [peerId]: { ...existing, messages: [...existing.messages, msg], unread: newUnread } };
                });
            });

            if (!isCleanedUp) {
                setSocket(newSocket);
            }
        };

        connect();

        return () => {
            isCleanedUp = true;
            if (newSocket) {
                newSocket.disconnect();
                socketInitializedRef.current = false;
            }
        };
    }, [currentUser?.id, tenant.slug]);

    // Handlers
    const handleLogin = (user: User) => {
        setCurrentUser(user);
        localStorage.setItem('chat_user', JSON.stringify(user));
    };

    const handleLogout = async () => {
        if (session) await signOut();
        setCurrentUser(null);
        setSocket(null);
        localStorage.removeItem('chat_user');
        setPrivateChats({});
        sqliteService.clearMessages();
        queryClient.setQueryData(['messages', 'global', tenant.slug], initialMessages);
        setSelectedChatPeerId(null);
        setActiveTab('chats');
    };

    const handleUpdateAlias = (newAlias: string) => {
        if (!currentUser || !socket) return;
        const updatedUser = { ...currentUser, alias: newAlias };
        setCurrentUser(updatedUser);
        localStorage.setItem('chat_user', JSON.stringify(updatedUser));
        socket.emit('join', { user: updatedUser, tenantSlug: tenant.slug });
    };

    const handleUpdateStatus = (newStatus: string) => {
        if (!currentUser || !socket) return;
        const updatedUser = { ...currentUser, status: newStatus };
        setCurrentUser(updatedUser);
        localStorage.setItem('chat_user', JSON.stringify(updatedUser));
        socket.emit('join', { user: updatedUser, tenantSlug: tenant.slug });
    };

    const handleRoomSend = useCallback(async (text: string) => {
        if (!currentUser || !socket || !activeRoomId) return;
        // Use crypto.randomUUID() for cleaner IDs
        const msg: Message = {
            id: generateId(), text, senderId: currentUser.id, senderAlias: currentUser.alias,
            senderGender: currentUser.gender, timestamp: new Date().toISOString(), roomId: activeRoomId, tenantId: tenant.id
        };
        console.log("[ChatInterface] Sending room message:", msg);
        if (Capacitor.isNativePlatform()) Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
        await sqliteService.saveMessage(msg, true);
        queryClient.setQueryData(['messages', 'global', tenant.slug, activeRoomId], (prev: Message[] | undefined) => [...(prev || []), msg]);
        socket.emit('sendMessage', { ...msg, tenantSlug: tenant.slug });
    }, [currentUser, socket, tenant.slug, activeRoomId, queryClient, tenant.id]);

    const handleDeleteMessage = useCallback((messageId: string) => {
        if (!socket || !activeRoomId) return;
        socket.emit('deleteMessage', { messageId, roomId: activeRoomId, tenantSlug: tenant.slug });
    }, [socket, activeRoomId, tenant.slug]);

    const handlePrivateSend = useCallback(async (text: string) => {
        if (!currentUser || !socket || !selectedChatPeerId) return;
        const msg: Message = {
            id: generateId(), text, senderId: currentUser.id, senderAlias: currentUser.alias,
            senderGender: currentUser.gender, timestamp: new Date().toISOString(), recipientId: selectedChatPeerId, tenantId: tenant.id
        };
        if (Capacitor.isNativePlatform()) Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
        await sqliteService.saveMessage(msg, false);
        setPrivateChats(prev => ({ ...prev, [selectedChatPeerId]: { ...prev[selectedChatPeerId], messages: [...prev[selectedChatPeerId].messages, msg] } }));
        socket.emit('sendMessage', { ...msg, tenantSlug: tenant.slug });
    }, [currentUser, socket, selectedChatPeerId, tenant.slug, tenant.id]);

    const handleStartChat = (peer: User) => {
        if (!privateChats[peer.id]) setPrivateChats(prev => ({ ...prev, [peer.id]: { peer, messages: [], unread: 0 } }));
        setSelectedChatPeerId(peer.id);
        setActiveRoomId(null);
        setActiveTab('chats');
    };

    const handleDeleteChat = (peerId: string) => {
        setPrivateChats(prev => { const n = { ...prev }; delete n[peerId]; return n; });
        if (selectedChatPeerId === peerId) setSelectedChatPeerId(null);
    };

    // 4. Swipe Back Logic (Native Only)
    const isRoomChatOpen = !!activeRoomId && activeTab === 'chats';
    const isPrivateChatOpen = !!selectedChatPeerId && activeTab === 'chats';
    const isChatOpen = isRoomChatOpen || isPrivateChatOpen;

    const handleSwipeComplete = useCallback(() => {
        if (selectedChatPeerId) setSelectedChatPeerId(null);
        if (activeRoomId) setActiveRoomId(null);
    }, [selectedChatPeerId, activeRoomId]);

    const { handlers, style: swipeStyle, isDragging, progress } = useSwipeBack({
        onSwipeBack: handleSwipeComplete,
        enabled: Capacitor.isNativePlatform() && isChatOpen
    });

    if (!currentUser) {
        // Show loading spinner while we are determining session state
        if (isSessionLoading || isRestoringSession) {
            return (
                <div className="h-full w-full flex items-center justify-center bg-white sm:bg-gray-50 flex-col">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            );
        }
        return <div className="h-full w-full flex items-center justify-center bg-white sm:bg-gray-50 flex-col"><Login onLogin={handleLogin} tenantName={tenant.name} tenantLogo={tenant.logoUrl || undefined} /></div>;
    }

    const totalUnread = Object.values(privateChats).reduce((acc, chat) => acc + chat.unread, 0);

    return (
        <div className="relative w-full h-full max-w-3xl mx-auto bg-white shadow-xl overflow-hidden">

            {/* BASE LAYER: LIST VARIANTS */}
            {/* Always rendered to support transparent swipe reveal, but hidden from SR/Interactions when covered if needed. */}
            <div className="absolute inset-0 z-0">
                <div className="flex flex-col w-full h-full">
                    <div className="flex-1 overflow-hidden relative">
                        {activeTab === 'chats' && (
                            <UnifiedChatList
                                rooms={tenant.rooms || []}
                                privateChats={Object.values(privateChats).map(c => ({ ...c, unreadCount: c.unread })).sort((a, b) => (b.messages.length ? new Date(b.messages[b.messages.length - 1].timestamp).getTime() : 0) - (a.messages.length ? new Date(a.messages[a.messages.length - 1].timestamp).getTime() : 0))}
                                activeRoomId={activeRoomId || undefined}
                                selectedChatPeerId={selectedChatPeerId || null}
                                roomOnlineCounts={roomOnlineCounts}
                                onlineUserIds={onlineUserIds}
                                onSelectRoom={(id) => { setActiveRoomId(id); setSelectedChatPeerId(null); }}
                                onSelectChat={(id) => { setSelectedChatPeerId(id); setActiveRoomId(null); }}
                                onDeleteChat={handleDeleteChat}
                                tenantName={tenant.name}
                            />
                        )}
                        {activeTab === 'users' && <UserList currentUser={currentUser} users={onlineUsers} onStartChat={handleStartChat} />}
                        {activeTab === 'local' && <LocalSection tenant={tenant} />}
                        {activeTab === 'settings' && <Settings user={currentUser} onLogout={handleLogout} onUpdateAlias={handleUpdateAlias} onUpdateStatus={handleUpdateStatus} tenantId={tenant.id} />}
                    </div>

                    {/* Bottom Nav - Part of Base Layer */}
                    <div className={`border-t border-gray-100 bg-white z-20 overflow-hidden`}>
                        <BottomNav activeTab={activeTab} onTabChange={(t) => { if (t === 'admin') { window.location.href = '/admin/dashboard'; return; } setActiveTab(t); if (t !== 'chats') { setSelectedChatPeerId(null); setActiveRoomId(null); } }} usersCount={onlineUsers.length} unreadChatsCount={totalUnread} tenantId={tenant.id} />
                    </div>
                </div>

                {/* Dark Overlay for Depth Effect during Swipe */}
                {isChatOpen && (
                    <div
                        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-200"
                        style={{ opacity: 0.3 * (1 - progress) }}
                    />
                )}
            </div>

            {/* TOP LAYER: CHAT DETAIL (Conditional Overlay) */}
            {/* Background is beige (#e5ddd5) to match input bar - visible behind iOS keyboard rounded corners */}
            {isChatOpen && (
                <div
                    className="absolute inset-0 z-30 flex flex-col bg-white"
                    style={Capacitor.isNativePlatform() ? { ...swipeStyle, opacity: 1 } : {}}
                    {...(Capacitor.isNativePlatform() ? handlers : {})}
                >
                    {isDragging && <div className="absolute inset-y-0 -left-8 w-8 bg-gradient-to-r from-black/10 to-transparent z-50 pointer-events-none" />}

                    {/* Render Content based on which chat is open */}
                    {isPrivateChatOpen && activeTab === 'chats' && privateChats[selectedChatPeerId!] ? (
                        <>
                            <header className="bg-white pt-safe text-gray-800 z-10 sticky top-0">
                                <div className="h-[60px] px-4 flex items-center gap-3">
                                    <button onClick={() => setSelectedChatPeerId(null)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <div className="flex flex-col">
                                        <h2 className="font-bold text-lg leading-tight">{privateChats[selectedChatPeerId!].peer.alias}</h2>
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-2 h-2 rounded-full ${onlineUsers.some(u => u.id === selectedChatPeerId) ? 'bg-primary' : 'bg-red-400'}`}></span>
                                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                                                {onlineUsers.some(u => u.id === selectedChatPeerId) ? 'Online' : 'Offline'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div className="flex-1 overflow-hidden relative" style={keyboardContentStyle}>
                                <GlobalChat user={currentUser} messages={privateChats[selectedChatPeerId!].messages} onSendMessage={handlePrivateSend} onlineCount={0} isOnline={true} hideHeader={true} showBottomNavPadding={false} isFocused={isInputFocused} onInputFocusChange={setIsInputFocused} isSyncing={false} />
                            </div>
                        </>
                    ) : isRoomChatOpen ? (
                        <div className="flex-1 flex flex-col h-full bg-white">
                            <GlobalChat
                                user={currentUser} messages={messages} onSendMessage={handleRoomSend} onRemoveMessage={handleDeleteMessage}
                                onlineCount={onlineUsers.length} isOnline={isConnected} headerTitle={tenant.rooms?.find(r => r.id === activeRoomId)?.name || tenant.name}
                                showBottomNavPadding={false} isFocused={isInputFocused} onInputFocusChange={setIsInputFocused} isSyncing={isFetchingGlobal}
                                isReadOnly={tenant.rooms?.find(r => r.id === activeRoomId)?.type === 'ANNOUNCEMENT' && !canManageTenant}
                                canModerate={canManageTenant} onBack={() => setActiveRoomId(null)}
                                showOnlineCount={tenant.rooms?.find(r => r.id === activeRoomId)?.type !== 'ANNOUNCEMENT'}
                                keyboardContentStyle={keyboardContentStyle}
                            />
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
