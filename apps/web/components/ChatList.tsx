import React from 'react';
import { User, Message, Gender } from '@/types';

interface PrivateChatSession {
    peer: User;
    messages: Message[];
    unreadCount: number;
}

interface ChatListProps {
    chats: PrivateChatSession[];
    onSelectChat: (peerId: string) => void;
    onDeleteChat: (peerId: string) => void;
    onlineUserIds: string[];
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, onDeleteChat, onlineUserIds }) => {
    const getAvatarColor = (gender: Gender) => {
        switch (gender) {
            case 'male': return 'bg-blue-500';
            case 'female': return 'bg-pink-500';
            default: return 'bg-purple-500';
        }
    };

    const getLastMessage = (msgs: Message[]) => {
        if (msgs.length === 0) return 'Inizia la conversazione...';
        return msgs[msgs.length - 1].text;
    };

    const getLastTime = (msgs: Message[]) => {
        if (msgs.length === 0) return '';
        const date = new Date(msgs[msgs.length - 1].timestamp);
        // Se oggi mostra l'ora, altrimenti data
        const now = new Date();
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <header className="bg-white pt-safe sticky top-0 z-10">
                <div className="h-[60px] px-4 flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Chat private</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-[80px]">
                {chats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-center font-medium">Nessuna chat attiva.<br />Cerca utenti nella scheda Utenti.</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {chats.map((chat) => (
                            <li
                                key={chat.peer.id}
                                onClick={() => onSelectChat(chat.peer.id)}
                                className="flex items-center gap-4 p-3 bg-white hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                            >
                                <div className={`w-14 h-14 rounded-full ${getAvatarColor(chat.peer.gender)} flex items-center justify-center text-white shrink-0 shadow-sm relative`}>
                                    <span className="font-bold text-xl uppercase">{chat.peer.alias.charAt(0)}</span>
                                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${onlineUserIds.includes(chat.peer.id) ? 'bg-emerald-500' : 'bg-red-400'}`} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 truncate text-base">{chat.peer.alias}</h3>
                                        <span className="text-[11px] text-gray-400 font-medium">{getLastTime(chat.messages)}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{getLastMessage(chat.messages)}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {chat.unreadCount > 0 && (
                                        <div className="min-w-[20px] h-5 px-1.5 bg-emerald-500 rounded-full flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-white">{chat.unreadCount}</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteChat(chat.peer.id);
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
};

export default ChatList;
