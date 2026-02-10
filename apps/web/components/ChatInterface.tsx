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
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { LocalSection } from './LocalSection';
import { LocalMenuOverlay } from './LocalMenuOverlay';
import { LocalFeedbackOverlay } from './LocalFeedbackOverlay';
import { useSwipeBack } from '@/hooks/useSwipeBack';
import { useMembership } from '@/hooks/useMembership';
import { useKeyboardAnimation } from '@/hooks/useKeyboardAnimation';
import { useSession, signOut, authClient } from '@/lib/auth-client';
import { clientGetTenantBySlug, clientGetMessages, clientGetTenantStaff } from '@/services/apiService';

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
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('chat_user');
                if (saved) return JSON.parse(saved);
            } catch { }
        }
        return null;
    });
    const [socket, setSocket] = useState<Socket | null>(null);
    const { data: session, isPending: isSessionLoading } = useSession();
    const router = useRouter();
    // New state to block UI until we are definitively checked both main and backup session sources
    const [isRestoringSession, setIsRestoringSession] = useState(true);
    const { canManageTenant, isAdmin, isModerator } = useMembership(tenant.id, currentUser?.id);

    // Smooth keyboard animation (native only) - contentStyle goes on content area, NOT header
    const { isKeyboardVisible, contentStyle: keyboardContentStyle } = useKeyboardAnimation();

    // UI State
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<Tab>((searchParams.get('tab') as Tab) || 'chats');
    const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
    const [selectedChatPeerId, setSelectedChatPeerId] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    // isInputFocused is now driven by keyboard visibility for native, or input focus for web
    const [isInputFocusedLocal, setIsInputFocusedLocal] = useState(false);
    const isInputFocused = Capacitor.isNativePlatform() ? isKeyboardVisible : isInputFocusedLocal;
    const setIsInputFocused = setIsInputFocusedLocal; // Keep setter for web compatibility

    // Data State
    const [onlineUsers, setOnlineUsers] = useState<(User & { socketId: string })[]>([]);
    const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
    const [roomOnlineCounts, setRoomOnlineCounts] = useState<Record<string, number>>({});
    const [privateChats, setPrivateChats] = useState<PrivateChatsMap>({});
    const [roomUnreads, setRoomUnreads] = useState<Record<string, number>>({});
    const [roomLastMessages, setRoomLastMessages] = useState<Record<string, Message>>({});
    const [isConnected, setIsConnected] = useState(false);

    const queryClient = useQueryClient();

    // Track if this is the first socket connection to prevent reconnection loops
    const socketInitializedRef = useRef(false);
    const userIdRef = useRef<string | null>(null);
    const activeRoomIdRef = useRef<string | null>(null);
    const activeTabRef = useRef<Tab>('chats');
    const selectedChatPeerIdRef = useRef<string | null>(null);

    // Sync refs
    useEffect(() => { activeRoomIdRef.current = activeRoomId; }, [activeRoomId]);
    useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);
    useEffect(() => { selectedChatPeerIdRef.current = selectedChatPeerId; }, [selectedChatPeerId]);

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

    // 2. Sync user data from BetterAuth session (updates localStorage user with fresh server data)
    useEffect(() => {
        if (isSessionLoading) return;

        const syncSession = async () => {
            // 1. If BetterAuth session is valid, use it as the source of truth
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

            // 2. No BetterAuth session — if we already have a user from localStorage, keep them
            const savedUser = localStorage.getItem('chat_user');
            if (savedUser) {
                setIsRestoringSession(false);
                return;
            }

            // 3. No session AND no localStorage — try backup endpoint as last resort
            try {
                console.log("[ChatInterface] No session or localStorage user, checking backup...");
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

        syncSession();
    }, [session, isSessionLoading]);

    // Restore private chats from SQLite on native + set platform class
    useEffect(() => {
        document.documentElement.classList.add(`platform-${Capacitor.getPlatform()}`);

        if (currentUser && Capacitor.isNativePlatform()) {
            sqliteService.getPrivateChats(currentUser.id).then(chats => {
                if (chats.length > 0) {
                    const restoredChats: PrivateChatsMap = {};
                    for (const chat of chats) {
                        const lastMsg = chat.messages[chat.messages.length - 1];
                        restoredChats[chat.peerId] = {
                            peer: {
                                id: chat.peerId,
                                alias: lastMsg.senderId === currentUser.id ? 'Chat' : lastMsg.senderAlias,
                                gender: lastMsg.senderId === currentUser.id ? 'other' : lastMsg.senderGender,
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
    }, [tenant.slug, currentUser?.id]);

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
            let token = sessionData?.data?.session?.token;

            // Fallback: read cookie directly for OTP sessions (not managed by BetterAuth client)
            if (!token && typeof document !== 'undefined') {
                const match = document.cookie.match(/better-auth\.session_token=([^;]+)/);
                if (match) token = decodeURIComponent(match[1]);
            }

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
                try {
                    await sqliteService.saveMessage(msg, true);
                } catch (e) {
                    console.error("[Socket] Failed to save message to SQLite:", e);
                }
                // Directly update cache for instant display (no HTTP refetch needed)
                const queryKey = ['messages', 'global', tenant.slug, msg.roomId || null];
                queryClient.setQueryData(queryKey, (prev: Message[] | undefined) => {
                    const messages = prev || [];
                    // Avoid duplicates
                    if (messages.some(m => m.id === msg.id)) return messages;
                    return [...messages, msg];
                });

                // Update room metadata for list preview and unreads
                if (msg.roomId) {
                    setRoomLastMessages(prev => ({ ...prev, [msg.roomId!]: msg }));
                    if (activeRoomIdRef.current !== msg.roomId) {
                        setRoomUnreads(prev => ({ ...prev, [msg.roomId!]: (prev[msg.roomId!] || 0) + 1 }));
                    }
                }
            });


            newSocket.on('messageDeleted', async (data: { messageId: string, roomId?: string }) => {
                await sqliteService.deleteMessage(data.messageId);
                const queryKey = ['messages', 'global', tenant.slug, data.roomId || null];
                queryClient.setQueryData(queryKey, (prev: Message[] | undefined) => (prev || []).filter(m => m.id !== data.messageId));
            });

            newSocket.on('privateMessage', async (msg: Message) => {
                console.log("[ChatInterface] Received privateMessage:", msg); // Debug log
                const isMe = msg.senderId === currentUser.id;
                const peerId = isMe ? msg.recipientId! : msg.senderId;
                try {
                    await sqliteService.saveMessage(msg, false);
                } catch (e) {
                    console.error("[Socket] Failed to save individual message to SQLite:", e);
                }

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
                    // AND we are NOT currently looking at this specific chat
                    const isChatActive = activeTabRef.current === 'chats' && selectedChatPeerIdRef.current === peerId;
                    const newUnread = (isMe || isChatActive) ? existing.unread : existing.unread + 1;

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
        // 1. Disconnect socket immediately
        if (socket) {
            socket.disconnect();
            socketInitializedRef.current = false;
        }

        // 2. BetterAuth sign-out (handles BetterAuth-managed sessions)
        if (session) await signOut();

        // 3. Also call explicit logout to handle OTP sessions and clear cookies
        try {
            const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/logout` : '/api/auth/logout';
            await fetch(url, { method: 'POST', credentials: 'include' });
        } catch {
            // Best-effort — don't block logout on network errors
        }

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

    const handleUpdateImage = (newImage: string) => {
        if (!currentUser || !socket) return;
        const updatedUser = { ...currentUser, image: newImage };
        setCurrentUser(updatedUser);
        localStorage.setItem('chat_user', JSON.stringify(updatedUser));
        socket.emit('join', { user: updatedUser, tenantSlug: tenant.slug });
    };

    const handleRoomSend = useCallback(async (text: string, imageUrl?: string) => {
        if (!currentUser || !socket || !activeRoomId) return;
        // Use crypto.randomUUID() for cleaner IDs
        const msg: Message = {
            id: generateId(), text, imageUrl, senderId: currentUser.id, senderAlias: currentUser.alias,
            senderGender: currentUser.gender, timestamp: new Date().toISOString(), roomId: activeRoomId, tenantId: tenant.id
        };
        console.log("[ChatInterface] Sending room message:", msg);
        if (Capacitor.isNativePlatform()) Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
        await sqliteService.saveMessage(msg, true);
        queryClient.setQueryData(['messages', 'global', tenant.slug, activeRoomId], (prev: Message[] | undefined) => [...(prev || []), msg]);
        socket.emit('sendMessage', { ...msg, tenantSlug: tenant.slug });
        setRoomLastMessages(prev => ({ ...prev, [activeRoomId]: msg }));
        setRoomUnreads(prev => ({ ...prev, [activeRoomId]: 0 }));
    }, [currentUser, socket, tenant.slug, activeRoomId, queryClient, tenant.id]);

    const handleDeleteMessage = useCallback((messageId: string) => {
        if (!socket || !activeRoomId) return;
        socket.emit('deleteMessage', { messageId, roomId: activeRoomId, tenantSlug: tenant.slug });
    }, [socket, activeRoomId, tenant.slug]);

    const handlePrivateSend = useCallback(async (text: string, imageUrl?: string) => {
        if (!currentUser || !socket || !selectedChatPeerId) return;
        const msg: Message = {
            id: generateId(), text, imageUrl, senderId: currentUser.id, senderAlias: currentUser.alias,
            senderGender: currentUser.gender, timestamp: new Date().toISOString(), recipientId: selectedChatPeerId, tenantId: tenant.id
        };
        if (Capacitor.isNativePlatform()) Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
        await sqliteService.saveMessage(msg, false);
        setPrivateChats(prev => ({ ...prev, [selectedChatPeerId]: { ...prev[selectedChatPeerId], messages: [...prev[selectedChatPeerId].messages, msg] } }));
        socket.emit('sendMessage', { ...msg, tenantSlug: tenant.slug });
    }, [currentUser, socket, selectedChatPeerId, tenant.slug, tenant.id]);

    const handleStartChat = (peer: User) => {
        setPrivateChats(prev => {
            const existing = prev[peer.id] || { peer, messages: [], unread: 0 };
            return { ...prev, [peer.id]: { ...existing, unread: 0 } };
        });
        setSelectedChatPeerId(peer.id);
        setActiveRoomId(null);
        setActiveTab('chats');
    };

    const handleContactStaff = async () => {
        try {
            const staff = await clientGetTenantStaff(tenant.slug);
            if (staff && staff.length > 0) {
                // Map backend user to frontend user format
                const staffMember = staff[0];
                const staffUser: User = {
                    id: staffMember.id,
                    alias: staffMember.name || 'Staff',
                    gender: (staffMember.gender as any) || 'other',
                };
                // Open chat with the first staff member found
                handleStartChat(staffUser);
            }
        } catch (error) {
            console.error("Error contacting staff:", error);
        }
    };

    const handleDeleteChat = (peerId: string) => {
        setPrivateChats(prev => { const n = { ...prev }; delete n[peerId]; return n; });
        if (selectedChatPeerId === peerId) setSelectedChatPeerId(null);
    };

    // 4. Swipe Back Logic (Native Only)
    const isRoomChatOpen = !!activeRoomId && activeTab === 'chats';
    const isPrivateChatOpen = !!selectedChatPeerId && activeTab === 'chats';
    const isChatOpen = isRoomChatOpen || isPrivateChatOpen || isMenuOpen || isFeedbackOpen;

    const handleSwipeComplete = useCallback(() => {
        if (selectedChatPeerId) setSelectedChatPeerId(null);
        if (activeRoomId) setActiveRoomId(null);
        if (isMenuOpen) setIsMenuOpen(false);
        if (isFeedbackOpen) setIsFeedbackOpen(false);
    }, [selectedChatPeerId, activeRoomId, isMenuOpen, isFeedbackOpen]);

    const { handlers, style: swipeStyle, isDragging, progress } = useSwipeBack({
        onSwipeBack: handleSwipeComplete,
        enabled: Capacitor.isNativePlatform() && isChatOpen
    });

    const totalUnread =
        Object.values(privateChats).reduce((acc, chat) => acc + chat.unread, 0) +
        Object.values(roomUnreads).reduce((acc, count) => acc + count, 0);

    // Auto-clear unread when chat becomes active
    useEffect(() => {
        if (activeTab === 'chats' && selectedChatPeerId && privateChats[selectedChatPeerId]?.unread > 0) {
            setPrivateChats(prev => ({
                ...prev,
                [selectedChatPeerId]: { ...prev[selectedChatPeerId], unread: 0 }
            }));
        }
        if (activeTab === 'chats' && activeRoomId && roomUnreads[activeRoomId] > 0) {
            setRoomUnreads(prev => ({
                ...prev,
                [activeRoomId]: 0
            }));
        }
    }, [activeTab, selectedChatPeerId, activeRoomId, privateChats[selectedChatPeerId]?.messages.length, roomUnreads]);

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

    return (
        <div className="relative w-full h-full max-w-3xl mx-auto bg-white shadow-xl overflow-hidden">

            {/* BASE LAYER: LIST VARIANTS */}
            {/* Always rendered to support transparent swipe reveal, but hidden from SR/Interactions when covered if needed. */}
            <div className="absolute inset-0 z-0">
                <div className="flex flex-col w-full h-full">
                    <div className="flex-1 overflow-hidden relative">
                        {activeTab === 'chats' && (
                            <UnifiedChatList
                                rooms={(tenant.rooms || []).map(r => ({
                                    ...r,
                                    lastMessage: roomLastMessages[r.id],
                                    unreadCount: roomUnreads[r.id] || 0
                                }))}
                                privateChats={Object.values(privateChats).map(c => ({ ...c, unreadCount: c.unread })).sort((a, b) => (b.messages.length ? new Date(b.messages[b.messages.length - 1].timestamp).getTime() : 0) - (a.messages.length ? new Date(a.messages[a.messages.length - 1].timestamp).getTime() : 0))}
                                activeRoomId={activeRoomId || undefined}
                                selectedChatPeerId={selectedChatPeerId || null}
                                roomOnlineCounts={roomOnlineCounts}
                                onlineUserIds={onlineUserIds}
                                onSelectRoom={(id) => {
                                    setActiveRoomId(id);
                                    setSelectedChatPeerId(null);
                                    setRoomUnreads(prev => ({ ...prev, [id]: 0 }));
                                }}
                                onSelectChat={(id) => {
                                    setSelectedChatPeerId(id);
                                    setActiveRoomId(null);
                                    // Clear unread immediately on select
                                    setPrivateChats(prev => ({
                                        ...prev,
                                        [id]: { ...prev[id], unread: 0 }
                                    }));
                                }}
                                onDeleteChat={handleDeleteChat}
                                tenantName={tenant.name}
                            />
                        )}
                        {activeTab === 'users' && <UserList currentUser={currentUser} users={onlineUsers} onStartChat={handleStartChat} />}
                        {activeTab === 'local' && (
                            <LocalSection
                                tenant={tenant}
                                isAdmin={isAdmin}
                                token={session?.session?.token}
                                onOpenMenu={() => setIsMenuOpen(true)}
                                onContactStaff={handleContactStaff}
                                onLeaveFeedback={() => setIsFeedbackOpen(true)}
                            />
                        )}
                        {activeTab === 'settings' && <Settings user={currentUser} onLogout={handleLogout} onUpdateAlias={handleUpdateAlias} onUpdateStatus={handleUpdateStatus} onUpdateImage={handleUpdateImage} tenantId={tenant.id} />}
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
                                roomType={tenant.rooms?.find(r => r.id === activeRoomId)?.type as any}
                            />
                        </div>
                    ) : isMenuOpen ? (
                        <div className="flex-1 flex flex-col h-full bg-white">
                            <LocalMenuOverlay
                                tenant={tenant}
                                isAdmin={isAdmin}
                                token={session?.session?.token}
                                onClose={() => setIsMenuOpen(false)}
                                onUpdateTenant={(updated) => {
                                    // Update local tenant data in the UI
                                    queryClient.setQueryData(['tenant', tenant.slug], updated);
                                    // Also refresh and close
                                    router.refresh();
                                }}
                            />
                        </div>
                    ) : isFeedbackOpen ? (
                        <div className="flex-1 flex flex-col h-full bg-white">
                            <LocalFeedbackOverlay
                                tenant={tenant}
                                isAdmin={isAdmin}
                                userId={currentUser?.id}
                                onClose={() => setIsFeedbackOpen(false)}
                            />
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
