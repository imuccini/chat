'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Tenant } from '@prisma/client';
import { User, Message } from '@/types';
import { API_BASE_URL } from '@/config';

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
    const [messages, setMessages] = useState<Message[]>(initialMessages); // Global messages
    const [onlineUsers, setOnlineUsers] = useState<(User & { socketId: string })[]>([]);
    const [privateChats, setPrivateChats] = useState<PrivateChatsMap>({});
    const [isConnected, setIsConnected] = useState(false);


    // 1. Initialize User (Check localStorage)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('chat_user');
            if (savedUser) {
                try {
                    const user = JSON.parse(savedUser);
                    setCurrentUser(user);
                } catch (e) {
                    console.error("Invalid saved user", e);
                }
            }
        }
    }, []);

    // 2. Connect Socket & Handlers
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

        newSocket.on('newMessage', (msg: Message) => {
            setMessages(prev => {
                if (prev.some(m => m.id === msg.id)) return prev;
                return [...prev, msg];
            });
        });

        newSocket.on('privateMessage', (msg: Message) => {
            const isMe = msg.senderId === currentUser.id;
            const peerId = isMe ? msg.recipientId! : msg.senderId;

            // If receiving a message from someone not in our list, we need their info.
            // For now, we construct it from the message data if valid.
            // In a real app we might fetch user details.

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

                // If we are currently viewing this chat, unread is 0
                // Note: we can't access live 'activeTab' here inside closure easily without ref or dependency.
                // But we have 'selectedChatPeerId' in dependency potentially or we handle read status in another effect.
                // Simplified: increment unread, let the Effect [activeTab, selectedChatPeerId] clear it if open.

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
    }, [currentUser, tenant.slug]);

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
        setMessages(initialMessages); // Reset to basics
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

        setMessages(prev => [...prev, optimisticMsg]);

        socket.emit('sendMessage', {
            ...optimisticMsg,
            tenantSlug: tenant.slug
        });
    };

    const handlePrivateSend = (text: string) => {
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
