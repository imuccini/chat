'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { User, Message, Tenant } from '@/types';
import { API_BASE_URL, SOCKET_URL } from '@/config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sqliteService } from '@/lib/sqlite';
import { Keyboard, KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

import { Capacitor } from '@capacitor/core';

// UI Components
import Login from './Login';
import GlobalChat from './GlobalChat';
import BottomNav from './BottomNav';
import UserList from './UserList';
import ChatList from './ChatList';
import Settings from './Settings';
import { RoomList } from './RoomList';
import { useSwipeBack } from '@/hooks/useSwipeBack';
import { useMembership } from '@/hooks/useMembership';
import { useSession, signOut, authClient } from '@/lib/auth-client';

interface ChatInterfaceProps {
    tenant: Tenant;
    initialMessages: Message[];
}

type Tab = 'room' | 'users' | 'chats' | 'settings' | 'admin';
type PrivateChatsMap = Record<string, { peer: User; messages: Message[]; unread: number }>;

export default function ChatInterface({ tenant, initialMessages }: ChatInterfaceProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const { data: session, isPending: isSessionLoading } = useSession();
    const { canManageTenant, isAdmin, isModerator } = useMembership(tenant.id, currentUser?.id);

    // UI State
    const [activeTab, setActiveTab] = useState<Tab>('room');
    const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
    const [selectedChatPeerId, setSelectedChatPeerId] = useState<string | null>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);

    // Data State
    const [onlineUsers, setOnlineUsers] = useState<(User & { socketId: string })[]>([]);
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

    // 2. Initialize User from Session
    useEffect(() => {
        if (!isSessionLoading && session?.user) {
            const isWaiting = localStorage.getItem('waiting_for_passkey') === 'true';
            if (isWaiting) return;

            const authUser: User = {
                id: session.user.id,
                alias: session.user.name || "User",
                gender: (session.user as any).gender || "other",
                status: (session.user as any).status || "",
                phoneNumber: (session.user as any).phoneNumber,
                joinedAt: new Date(session.user.createdAt).getTime()
            };

            setCurrentUser(prev => {
                if (prev && prev.id === authUser.id && prev.alias === authUser.alias) return prev;
                localStorage.setItem('chat_user', JSON.stringify(authUser));
                return authUser;
            });
        }
    }, [session, isSessionLoading]);

    // Restore data on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('chat_user');
            if (savedUser && !session && !isSessionLoading) {
                try {
                    const user = JSON.parse(savedUser);
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
                } catch (e) { }
            }
        }
        document.documentElement.classList.add(`platform-${Capacitor.getPlatform()}`);
    }, [tenant.slug]);

    // Dynamic background for native
    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;
        const color = (activeTab === 'room' || !!selectedChatPeerId) ? '#e5ddd5' : '#ffffff';
        document.body.style.backgroundColor = color;
        document.documentElement.style.backgroundColor = color;
    }, [activeTab, selectedChatPeerId, currentUser]);

    // Keyboard listeners
    useEffect(() => {
        if (Capacitor.isNativePlatform() && !!currentUser) {
            Keyboard.setResizeMode({ mode: KeyboardResize.Body });
            let showListener: any, hideListener: any;
            const setup = async () => {
                showListener = await Keyboard.addListener('keyboardDidShow', () => setIsInputFocused(true));
                hideListener = await Keyboard.addListener('keyboardDidHide', () => setIsInputFocused(false));
            };
            setup();
            return () => {
                if (showListener) showListener.remove();
                if (hideListener) hideListener.remove();
            };
        }
    }, [!!currentUser]);

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

            newSocket = io(SOCKET_URL, {
                auth: { token },
                query: {
                    tenantSlug: tenant.slug,
                    userId: currentUser.id,
                    userAlias: currentUser.alias  // Pass alias so server uses it
                },
                transports: ['websocket'],
                reconnectionAttempts: 5
            });

            newSocket.on('connect', () => {
                if (isCleanedUp) return;
                setIsConnected(true);
                socketInitializedRef.current = true;
                userIdRef.current = currentUser.id;
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

            newSocket.on('presenceUpdate', (users: (User & { socketId: string })[]) => setOnlineUsers(users));

            newSocket.on('newMessage', async (msg: Message) => {
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
                    return { ...prev, [peerId]: { ...existing, messages: [...existing.messages, msg], unread: existing.unread + 1 } };
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
        setActiveTab('room');
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
        const msg: Message = {
            id: Date.now().toString(), text, senderId: currentUser.id, senderAlias: currentUser.alias,
            senderGender: currentUser.gender, timestamp: new Date().toISOString(), roomId: activeRoomId, tenantId: tenant.id
        };
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
            id: Date.now().toString(), text, senderId: currentUser.id, senderAlias: currentUser.alias,
            senderGender: currentUser.gender, timestamp: new Date().toISOString(), recipientId: selectedChatPeerId
        };
        if (Capacitor.isNativePlatform()) Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
        await sqliteService.saveMessage(msg, false);
        setPrivateChats(prev => ({ ...prev, [selectedChatPeerId]: { ...prev[selectedChatPeerId], messages: [...prev[selectedChatPeerId].messages, msg] } }));
        socket.emit('sendMessage', { ...msg, tenantSlug: tenant.slug });
    }, [currentUser, socket, selectedChatPeerId, tenant.slug]);

    const handleStartChat = (peer: User) => {
        if (!privateChats[peer.id]) setPrivateChats(prev => ({ ...prev, [peer.id]: { peer, messages: [], unread: 0 } }));
        setSelectedChatPeerId(peer.id);
        setActiveTab('chats');
    };

    const handleDeleteChat = (peerId: string) => {
        setPrivateChats(prev => { const n = { ...prev }; delete n[peerId]; return n; });
        if (selectedChatPeerId === peerId) setSelectedChatPeerId(null);
    };

    const { swipeHandlers, swipeStyle, isDragging } = useSwipeBack({
        onSwipeBack: () => setSelectedChatPeerId(null),
        enabled: Capacitor.isNativePlatform() && selectedChatPeerId !== null
    });

    if (!currentUser) return <div className="h-full w-full flex items-center justify-center bg-white sm:bg-gray-50 flex-col"><Login onLogin={handleLogin} tenantName={tenant.name} /></div>;

    if (selectedChatPeerId && activeTab === 'chats') {
        const chat = privateChats[selectedChatPeerId];
        if (!chat) return null;
        return (
            <div className="flex flex-col w-full h-full max-w-3xl mx-auto bg-white shadow-xl overflow-hidden relative" style={swipeStyle} {...swipeHandlers}>
                {isDragging && <div className="absolute inset-y-0 -left-8 w-8 bg-gradient-to-r from-black/10 to-transparent z-50 pointer-events-none" />}
                <header className="bg-white pt-safe text-gray-800 z-10 sticky top-0">
                    <div className="h-[60px] px-4 flex items-center gap-3">
                        <button onClick={() => setSelectedChatPeerId(null)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                        <div className="flex flex-col"><h2 className="font-bold text-lg leading-tight">{chat.peer.alias}</h2>{onlineUsers.some(u => u.id === selectedChatPeerId) && <span className="text-xs text-emerald-500 font-medium">Online</span>}</div>
                    </div>
                </header>
                <div className="flex-1 overflow-hidden relative">
                    <GlobalChat user={currentUser} messages={chat.messages} onSendMessage={handlePrivateSend} onlineCount={0} isOnline={true} hideHeader={true} showBottomNavPadding={false} isFocused={isInputFocused} isSyncing={false} />
                </div>
            </div>
        );
    }

    const totalUnread = Object.values(privateChats).reduce((acc, chat) => acc + chat.unread, 0);

    return (
        <div className="flex flex-col w-full h-full max-w-3xl mx-auto bg-white shadow-xl overflow-hidden relative">
            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'room' && !activeRoomId && <RoomList rooms={tenant.rooms || []} onSelectRoom={setActiveRoomId} activeRoomId={activeRoomId || undefined} />}
                {activeTab === 'room' && activeRoomId && (
                    <GlobalChat
                        user={currentUser} messages={messages} onSendMessage={handleRoomSend} onRemoveMessage={handleDeleteMessage}
                        onlineCount={onlineUsers.length} isOnline={isConnected} headerTitle={tenant.rooms?.find(r => r.id === activeRoomId)?.name || tenant.name}
                        showBottomNavPadding={false} isFocused={isInputFocused} onInputFocusChange={setIsInputFocused} isSyncing={isFetchingGlobal}
                        isReadOnly={tenant.rooms?.find(r => r.id === activeRoomId)?.type === 'ANNOUNCEMENT' && !canManageTenant}
                        canModerate={canManageTenant} onBack={() => setActiveRoomId(null)}
                    />
                )}
                {activeTab === 'users' && <UserList currentUser={currentUser} users={onlineUsers} onStartChat={handleStartChat} />}
                {activeTab === 'chats' && <ChatList chats={Object.values(privateChats).map(c => ({ ...c, unreadCount: c.unread })).sort((a, b) => (b.messages.length ? new Date(b.messages[b.messages.length - 1].timestamp).getTime() : 0) - (a.messages.length ? new Date(a.messages[a.messages.length - 1].timestamp).getTime() : 0))} onSelectChat={setSelectedChatPeerId} onDeleteChat={handleDeleteChat} />}
                {activeTab === 'settings' && <Settings user={currentUser} onLogout={handleLogout} onUpdateAlias={handleUpdateAlias} onUpdateStatus={handleUpdateStatus} tenantId={tenant.id} />}
            </div>
            <div className={`border-t border-gray-100 bg-white z-20 overflow-hidden ${isInputFocused || (activeTab === 'room' && activeRoomId) ? 'hidden' : 'block'}`}>
                <BottomNav activeTab={activeTab} onTabChange={(t) => { if (t === 'admin') { window.location.href = '/admin/dashboard'; return; } setActiveTab(t); setSelectedChatPeerId(null); if (t !== 'room') setActiveRoomId(null); }} usersCount={onlineUsers.length} unreadChatsCount={totalUnread} tenantId={tenant.id} />
            </div>
        </div>
    );
}
