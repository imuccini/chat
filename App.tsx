
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import Login from './components/Login';
import GlobalChat from './components/GlobalChat';
import UserList from './components/UserList';
import ChatList from './components/ChatList';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';
import { User, Message } from './types';

// Types for State
type Tab = 'room' | 'users' | 'chats' | 'settings';
type PrivateChatsMap = Record<string, { peer: User; messages: Message[]; unread: number }>;

interface Tenant {
  slug: string;
  name: string;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('room');
  const [socket, setSocket] = useState<Socket | null>(null);

  // Multi-tenant State
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [tenantSlug, setTenantSlug] = useState<string>('');

  // Data State
  const [onlineUsers, setOnlineUsers] = useState<(User & { socketId: string })[]>([]);
  const [globalMessages, setGlobalMessages] = useState<Message[]>([]);
  const [privateChats, setPrivateChats] = useState<PrivateChatsMap>({});

  // UI State
  const [selectedChatPeerId, setSelectedChatPeerId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // 1. Detect Tenant from URL and Restore User
  useEffect(() => {
    // URL patterns: /beach-club or /?tenant=beach-club
    let slug = window.location.pathname.split('/')[1] || 'treno-wifi';
    if (!slug) {
      const params = new URLSearchParams(window.location.search);
      slug = params.get('tenant') || 'treno-wifi';
    }
    setTenantSlug(slug);

    // Fetch tenant metadata
    fetch(`/api/tenants/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Tenant not found');
        return res.json();
      })
      .then(data => setTenant(data))
      .catch(err => {
        console.error(err);
        setTenant({ slug: 'error', name: 'Chat Non Trovata' });
      });

    const savedUser = sessionStorage.getItem('chat_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Errore nel caricamento utente", e);
      }
    }
  }, []);

  // 2. Socket Connection (Tenant Aware)
  useEffect(() => {
    if (!currentUser || !tenantSlug) return;

    // Load tenant messages history
    fetch(`/api/messages?tenant=${tenantSlug}`)
      .then(res => res.json())
      .then(data => setGlobalMessages(data))
      .catch(console.error);

    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('join', { user: currentUser, tenantSlug });
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('presenceUpdate', (users: (User & { socketId: string })[]) => {
      setOnlineUsers(users);
    });

    newSocket.on('newMessage', (msg: Message) => {
      setGlobalMessages(prev => {
        if (prev.some(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    newSocket.on('privateMessage', (msg: Message) => {
      const isMe = msg.senderId === currentUser.id;
      const peerId = isMe ? msg.recipientId! : msg.senderId;

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
    };
  }, [currentUser, tenantSlug]);

  // 3. Handlers
  useEffect(() => {
    if (selectedChatPeerId && privateChats[selectedChatPeerId]?.unread > 0) {
      setPrivateChats(prev => ({
        ...prev,
        [selectedChatPeerId]: {
          ...prev[selectedChatPeerId],
          unread: 0
        }
      }));
    }
  }, [selectedChatPeerId, privateChats]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('chat_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSocket(null);
    sessionStorage.removeItem('chat_user');
    setPrivateChats({});
    setGlobalMessages([]);
    setSelectedChatPeerId(null);
    setActiveTab('room');
  };

  const handleUpdateAlias = (newAlias: string) => {
    if (!currentUser || !socket) return;
    const oldAlias = currentUser.alias;
    const updatedUser = { ...currentUser, alias: newAlias };
    setCurrentUser(updatedUser);
    sessionStorage.setItem('chat_user', JSON.stringify(updatedUser));
    socket.emit('updateAlias', { oldAlias, newAlias });
  };

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
  };

  const handleGlobalSend = (text: string) => {
    if (!socket || !currentUser) return;
    const msg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: currentUser.id,
      senderAlias: currentUser.alias,
      senderGender: currentUser.gender,
      text,
      timestamp: Date.now()
    };
    setGlobalMessages(prev => [...prev, msg]);
    socket.emit('sendMessage', msg);
  };

  const handlePrivateSend = (text: string) => {
    if (!socket || !currentUser || !selectedChatPeerId) return;
    const msg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: currentUser.id,
      senderAlias: currentUser.alias,
      senderGender: currentUser.gender,
      text,
      timestamp: Date.now(),
      recipientId: selectedChatPeerId
    };
    setPrivateChats(prev => ({
      ...prev,
      [selectedChatPeerId]: {
        ...prev[selectedChatPeerId],
        messages: [...prev[selectedChatPeerId].messages, msg]
      }
    }));
    socket.emit('sendMessage', msg);
  };

  if (!currentUser || !tenant) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <Login onLogin={handleLogin} tenantName={tenant?.name || 'Caricamento...'} />
      </div>
    );
  }

  const totalUnread = Object.values(privateChats).reduce((acc, chat) => acc + chat.unread, 0);

  // Private Chat View
  if (selectedChatPeerId && activeTab === 'chats') {
    const chat = privateChats[selectedChatPeerId];
    if (!chat) return null;

    return (
      <div className="h-full w-full bg-white flex flex-col">
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

  return (
    <div className="h-full w-full bg-gray-100 flex flex-col">
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'room' && (
          <GlobalChat
            user={currentUser}
            messages={globalMessages}
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
              const tA = a.messages.length ? a.messages[a.messages.length - 1].timestamp : 0;
              const tB = b.messages.length ? b.messages[b.messages.length - 1].timestamp : 0;
              return tB - tA;
            })}
            onSelectChat={(id) => {
              setSelectedChatPeerId(id);
            }}
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
};

export default App;
