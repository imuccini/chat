'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Tenant } from '@prisma/client';
import { User, Message } from '@/types';
import { API_BASE_URL } from '@/config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sqliteService } from '@/lib/sqlite';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

// UI Components
import Login from './Login';
import GlobalChat from './GlobalChat';
import BottomNav from './BottomNav';
import UserList from './UserList';
import ChatList from './ChatList';
import Settings from './Settings';

interface ChatInterfaceProps {
    tenant: Tenant;
    initialMessages: Message[];
}

type Tab = 'room' | 'users' | 'chats' | 'settings';
type PrivateChatsMap = Record<string, { peer: User; messages: Message[]; unread: number }>;

export default function ChatInterface({ tenant, initialMessages }: ChatInterfaceProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    // UI State
    const [activeTab, setActiveTab] = useState<Tab>('room');
    const [selectedChatPeerId, setSelectedChatPeerId] = useState<string | null>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);

    // Data State
    const [onlineUsers, setOnlineUsers] = useState<(User & { socketId: string })[]>([]);
    const [privateChats, setPrivateChats] = useState<PrivateChatsMap>({});
    const [isConnected, setIsConnected] = useState(false);


    const queryClient = useQueryClient();

    // 1. Initial Data Fetching (Offline-First)
    const { data: messages = initialMessages, isFetching: isFetchingGlobal } = useQuery({
        queryKey: ['messages', 'global', tenant.slug],
        queryFn: async () => {
            // First load from SQLite
            const localMessages = await sqliteService.getMessages(true);

            // In a real app, you'd fetch from API here and update SQLite
            // For now, we simulate API fetch by returning initialMessages if SQLite is empty
            // or just returning what we have.

            // Simulate background sync from server
            try {
                const response = await fetch(`${API_BASE_URL}/api/messages?tenant=${tenant.slug}`);
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

            return localMessages.length > 0 ? localMessages : initialMessages;
        },
        initialData: initialMessages,
    });

    // 2. Initialize User, Keyboard and Haptics
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('chat_user');
            if (savedUser) {
                try {
                    const user = JSON.parse(savedUser);
                    setCurrentUser(user);

                    // Restore private chats from SQLite (native only)
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
                                console.log(`Restored ${chats.length} private chats from SQLite`);
                            }
                        }).catch(err => console.error('Error restoring private chats:', err));
                    }
                } catch (e) {
                    console.error("Invalid saved user", e);
                }
            }

            // Keyboard Configuration
            if (Capacitor.isNativePlatform()) {
                Keyboard.setResizeMode({ mode: KeyboardResize.Body }).catch(err => {
                    console.error("Error setting keyboard resize mode", err);
                });
            }
        }
    }, []);

    // 3. Connect Socket & Handlers
    useEffect(() => {
        if (!currentUser) return;

        const newSocket = io(API_BASE_URL || undefined, {
            query: {
                tenantSlug: tenant.slug,
                userId: currentUser.id
            }
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log("Socket connected");
            setIsConnected(true);
            newSocket.emit('join', { user: currentUser, tenantSlug: tenant.slug });
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
        });

        newSocket.on('presenceUpdate', (users: (User & { socketId: string })[]) => {
            setOnlineUsers(users);
        });

        newSocket.on('newMessage', async (msg: Message) => {
            await sqliteService.saveMessage(msg, true);
            queryClient.invalidateQueries({ queryKey: ['messages', 'global', tenant.slug] });
        });

        newSocket.on('privateMessage', async (msg: Message) => {
            const isMe = msg.senderId === currentUser.id;
            const peerId = isMe ? msg.recipientId! : msg.senderId;

            await sqliteService.saveMessage(msg, false);

            // Haptic feedback for incoming private messages
            if (!isMe && Capacitor.isNativePlatform()) {
                Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
            }

            setPrivateChats(prev => {
                const existing = prev[peerId] || {
                    peer: {
                        id: peerId,
                        alias: isMe ? 'Unknown' : msg.senderAlias,
                        gender: isMe ? 'male' : msg.senderGender,
                        joinedAt: Date.now()
                    },
                    messages: [],
                    unread: 0
                };

                if (existing.messages.some(m => m.id === msg.id)) return prev;

                return {
                    ...prev,
                    [peerId]: {
                        ...existing,
                        messages: [...existing.messages, msg],
                        unread: existing.unread + 1
                    }
                };
            });
        });

        return () => {
            newSocket.disconnect();
        }
    }, [currentUser, tenant.slug, queryClient]);

    // 3. Mark read when viewing chat
    useEffect(() => {
        if (activeTab === 'chats' && selectedChatPeerId && privateChats[selectedChatPeerId]?.unread > 0) {
            setPrivateChats(prev => ({
                ...prev,
                [selectedChatPeerId]: {
                    ...prev[selectedChatPeerId],
                    unread: 0
                }
            }));
        }
    }, [activeTab, selectedChatPeerId, privateChats]);


    // Handlers
    const handleLogin = (user: User) => {
        setCurrentUser(user);
        localStorage.setItem('chat_user', JSON.stringify(user));
    };

    const handleLogout = () => {
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

        // Notify server - assuming server handles 'updateAlias' event or just re-join
        // For simplicity reusing join or we could implement updateAlias on server
        socket.emit('join', { user: updatedUser, tenantSlug: tenant.slug });
    };

    const handleUpdateStatus = (newStatus: string) => {
        if (!currentUser || !socket) return;

        const updatedUser = { ...currentUser, status: newStatus };
        setCurrentUser(updatedUser);
        localStorage.setItem('chat_user', JSON.stringify(updatedUser));

        // Notify server of status update
        socket.emit('join', { user: updatedUser, tenantSlug: tenant.slug });
    };

    const handleGlobalSend = async (text: string) => {
        if (!currentUser || !socket) return;

        const tempId = Date.now().toString();
        const optimisticMsg: Message = {
            id: tempId,
            text: text,
            senderId: currentUser.id,
            senderAlias: currentUser.alias,
            senderGender: currentUser.gender,
            timestamp: new Date().toISOString()
        };

        // Haptic feedback for local send
        if (Capacitor.isNativePlatform()) {
            Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
        }

        // Persist to local SQLite immediately
        await sqliteService.saveMessage(optimisticMsg, true);

        // Update TanStack Query cache optimistically
        queryClient.setQueryData(['messages', 'global', tenant.slug], (prev: Message[] | undefined) => {
            return [...(prev || []), optimisticMsg];
        });

        socket.emit('sendMessage', {
            ...optimisticMsg,
            tenantSlug: tenant.slug
        });
    };

    const handlePrivateSend = async (text: string) => {
        if (!currentUser || !socket || !selectedChatPeerId) return;

        const msg: Message = {
            id: Date.now().toString(),
            text,
            senderId: currentUser.id,
            senderAlias: currentUser.alias,
            senderGender: currentUser.gender,
            timestamp: new Date().toISOString(),
            recipientId: selectedChatPeerId
        };

        // Haptic feedback for local send
        if (Capacitor.isNativePlatform()) {
            Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
        }

        // Save to SQLite for offline persistence
        await sqliteService.saveMessage(msg, false);

        // Optimistic update
        setPrivateChats(prev => ({
            ...prev,
            [selectedChatPeerId]: {
                ...prev[selectedChatPeerId],
                messages: [...prev[selectedChatPeerId].messages, msg]
            }
        }));

        socket.emit('sendMessage', {
            ...msg,
            tenantSlug: tenant.slug,
            isPrivate: true // Signal to server
        });
    }

    const handleStartChat = (peer: User) => {
        if (!privateChats[peer.id]) {
            setPrivateChats(prev => ({
                ...prev,
                [peer.id]: { peer, messages: [], unread: 0 }
            }));
        }
        setSelectedChatPeerId(peer.id);
        setActiveTab('chats');
    };

    const handleDeleteChat = (peerId: string) => {
        setPrivateChats(prev => {
            const next = { ...prev };
            delete next[peerId];
            return next;
        });
        if (selectedChatPeerId === peerId) {
            setSelectedChatPeerId(null);
        }
    };


    // Render Login
    if (!currentUser) {
        return (
            <div className="h-[100dvh] w-full flex items-center justify-center bg-white sm:bg-gray-50 flex-col">
                <Login onLogin={handleLogin} tenantName={tenant.name} />
            </div>
        );
    }

    // Render Private Chat View
    if (selectedChatPeerId && activeTab === 'chats') {
        const chat = privateChats[selectedChatPeerId];
        // If chat was deleted but we are here, go back
        if (!chat) {
            setSelectedChatPeerId(null);
            return null;
        }

        return (
            <div className="flex flex-col w-full h-[100dvh] max-w-3xl mx-auto bg-white shadow-xl overflow-hidden relative">
                <header className="bg-white border-b border-gray-100 pt-safe text-gray-800 z-10 sticky top-0">
                    <div className="h-[60px] px-4 flex items-center gap-3">
                        <button onClick={() => setSelectedChatPeerId(null)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="flex flex-col">
                            <h2 className="font-bold text-lg leading-tight">{chat.peer.alias}</h2>
                            {onlineUsers.some(u => u.id === selectedChatPeerId) && (
                                <span className="text-xs text-emerald-500 font-medium">Online</span>
                            )}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-hidden relative">
                    <GlobalChat
                        user={currentUser}
                        messages={chat.messages}
                        onSendMessage={handlePrivateSend}
                        onlineCount={0}
                        isOnline={true}
                        hideHeader={true}
                        showBottomNavPadding={false}
                        onInputFocusChange={setIsInputFocused}
                        isFocused={isInputFocused}
                        isSyncing={false} // Private chat sync is separate
                    />
                </div>
            </div>
        );
    }

    const totalUnread = Object.values(privateChats).reduce((acc, chat) => acc + chat.unread, 0);

    return (
        <div className="flex flex-col w-full h-[100dvh] max-w-3xl mx-auto bg-gray-100 shadow-xl overflow-hidden relative">
            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'room' && (
                    <GlobalChat
                        user={currentUser}
                        messages={messages}
                        onSendMessage={handleGlobalSend}
                        onlineCount={onlineUsers.length}
                        isOnline={isConnected}
                        headerTitle={tenant.name}
                        showBottomNavPadding={true}
                        onInputFocusChange={setIsInputFocused}
                        isFocused={isInputFocused}
                        isSyncing={isFetchingGlobal}
                    />
                )}
                {activeTab === 'users' && (
                    <UserList
                        currentUser={currentUser}
                        users={onlineUsers}
                        onStartChat={handleStartChat}
                    />
                )}
                {activeTab === 'chats' && (
                    <ChatList
                        chats={Object.values(privateChats).map(c => ({ ...c, unreadCount: c.unread })).sort((a, b) => {
                            const tA = a.messages.length ? new Date(a.messages[a.messages.length - 1].timestamp).getTime() : 0;
                            const tB = b.messages.length ? new Date(b.messages[b.messages.length - 1].timestamp).getTime() : 0;
                            return tB - tA;
                        })}
                        onSelectChat={setSelectedChatPeerId}
                        onDeleteChat={handleDeleteChat}
                    />
                )}
                {activeTab === 'settings' && (
                    <Settings
                        user={currentUser}
                        onLogout={handleLogout}
                        onUpdateAlias={handleUpdateAlias}
                        onUpdateStatus={handleUpdateStatus}
                    />
                )}
            </div>

            {!isInputFocused && (
                <BottomNav
                    activeTab={activeTab}
                    onTabChange={(t) => {
                        setActiveTab(t);
                        setSelectedChatPeerId(null);
                    }}
                    usersCount={onlineUsers.length}
                    unreadChatsCount={totalUnread}
                />
            )}
        </div>
    );
}
