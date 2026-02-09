
import React, { useState, useMemo } from 'react';
import { User, Message, Room } from '@/types';
import { Megaphone, Hash } from 'lucide-react';
import Icon from './Icon';

interface PrivateChatSession {
    peer: User;
    messages: Message[];
    unreadCount: number;
}

interface UnifiedChatListProps {
    rooms: (Room & { lastMessage?: Message; unreadCount?: number })[];
    privateChats: PrivateChatSession[];
    activeRoomId?: string;
    selectedChatPeerId?: string;
    roomOnlineCounts: Record<string, number>;
    onlineUserIds: string[];
    onSelectRoom: (roomId: string) => void;
    onSelectChat: (peerId: string) => void;
    onDeleteChat: (peerId: string) => void;
    tenantName: string;
}

type FilterType = 'all' | 'rooms' | 'private' | 'unread';

export function UnifiedChatList({
    rooms,
    privateChats,
    activeRoomId,
    selectedChatPeerId,
    roomOnlineCounts,
    onlineUserIds,
    onSelectRoom,
    onSelectChat,
    onDeleteChat,
    tenantName
}: UnifiedChatListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    // Filter Logic
    const filteredContent = useMemo(() => {
        const query = searchQuery.toLowerCase();

        // Filter Rooms
        const filteredRooms = rooms.filter(room => {
            if (activeFilter === 'private' || activeFilter === 'unread') return false;
            return room.name.toLowerCase().includes(query);
        });

        // Filter Private Chats
        const filteredChats = privateChats.filter(chat => {
            if (activeFilter === 'rooms') return false;
            if (activeFilter === 'unread' && chat.unreadCount === 0) return false;
            return chat.peer.alias.toLowerCase().includes(query);
        }).sort((a, b) => {
            // Sort by latest message timestamp
            const timeA = a.messages.length ? new Date(a.messages[a.messages.length - 1].timestamp).getTime() : 0;
            const timeB = b.messages.length ? new Date(b.messages[b.messages.length - 1].timestamp).getTime() : 0;
            return timeB - timeA;
        });

        return { rooms: filteredRooms, chats: filteredChats };
    }, [rooms, privateChats, searchQuery, activeFilter]);

    const getLastMessage = (msgs: Message[]) => {
        if (msgs.length === 0) return 'Inizia la conversazione...';
        return msgs[msgs.length - 1].text;
    };

    const getLastTime = (msgs: Message[]) => {
        if (msgs.length === 0) return '';
        const date = new Date(msgs[msgs.length - 1].timestamp);
        const now = new Date();
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
    };

    const getAvatarColor = (gender: string) => {
        switch (gender) {
            case 'male': return 'bg-blue-500';
            case 'female': return 'bg-pink-500';
            default: return 'bg-purple-500';
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
            {/* Header with Search and Filters */}
            <div className="bg-white/80 glass dark:bg-gray-900/80 sticky top-0 z-10 pt-safe shadow-sm backdrop-blur-md">
                <div className="h-[60px] px-4 flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Chats</h1>
                </div>

                {/* Search Bar */}
                <div className="px-4 pb-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="Search_Magnifying_Glass" className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cerca chat e stanze..."
                            className="block w-full pl-10 pr-3 py-2 rounded-xl leading-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-transparent sm:text-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Chips Filters */}
                <div className="px-4 pb-2">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                        {[
                            { id: 'all', label: 'Tutto' },
                            { id: 'rooms', label: 'Stanze' },
                            { id: 'private', label: 'Privati' },
                            { id: 'unread', label: 'Non letti' }
                        ].map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id as FilterType)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${activeFilter === filter.id
                                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-2 pb-[100px] space-y-4">

                {/* Rooms Section - Pinned to Top */}
                {filteredContent.rooms.length > 0 && (
                    <div className="space-y-1">
                        {/* Optional Section Header if mixed content */}
                        <div className="px-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-3">Stanze</span>
                        </div>
                        {filteredContent.rooms.map((room) => {
                            const isAnnouncement = room.type === 'ANNOUNCEMENT';
                            const RoomIcon = isAnnouncement ? Megaphone : Hash;
                            const isActive = room.id === activeRoomId;

                            return (
                                <button
                                    key={room.id}
                                    onClick={() => onSelectRoom(room.id)}
                                    className={`w-full flex items-center p-3 rounded-xl transition-all ${isActive
                                        ? 'bg-primary/5 text-gray-900 dark:bg-primary/10 dark:text-gray-100'
                                        : 'hover:bg-gray-50 text-gray-900 dark:hover:bg-gray-800 dark:text-gray-300'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full mr-3 shrink-0 flex items-center justify-center ${isActive
                                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                        }`}>
                                        <RoomIcon size={20} />
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-base truncate pr-2">{room.name}</h3>
                                            {room.lastMessage && (
                                                <span className="text-[11px] text-gray-400 font-medium shrink-0">
                                                    {getLastTime([room.lastMessage])}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {room.lastMessage ? (
                                                room.lastMessage.text || (room.lastMessage.imageUrl ? '📷 Foto' : '')
                                            ) : isAnnouncement ? (
                                                <>Messaggi da <span className="font-bold">{tenantName}</span></>
                                            ) : (
                                                room.description || 'Chat pubblica'
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 ml-2 shrink-0">
                                        {(room.unreadCount || 0) > 0 ? (
                                            <div className="min-w-[20px] h-5 px-1.5 bg-primary rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-white leading-none">
                                                    {room.unreadCount! > 99 ? '99+' : room.unreadCount}
                                                </span>
                                            </div>
                                        ) : !isAnnouncement && (roomOnlineCounts[room.id] > 0) ? (
                                            <div className="min-w-[20px] h-5 px-1.5 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-bold leading-none">
                                                    {roomOnlineCounts[room.id] > 99 ? '99+' : roomOnlineCounts[room.id]}
                                                </span>
                                            </div>
                                        ) : null}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Private Chats Section */}
                {filteredContent.chats.length > 0 && (
                    <div className="space-y-1">
                        <div className="px-2 mt-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-3">Messaggi</span>
                        </div>
                        {filteredContent.chats.map((chat) => {
                            const isActive = chat.peer.id === selectedChatPeerId;
                            // Use our new Icon component or inline SVG if preferred, but following request for consistency.
                            // Actually user asked to use the sprite for specific things, but here standard Lucide/SVG is fine?
                            // User said "Rooms must have distinctive icons... Private chats... user icon".
                            // I'll stick to the existing style for now, maybe incorporate the Icon component if I had specific icon names.

                            return (
                                <button
                                    key={chat.peer.id}
                                    onClick={() => onSelectChat(chat.peer.id)}
                                    className={`w-full flex items-center p-3 rounded-xl transition-all ${isActive
                                        ? 'bg-primary/5 text-gray-900'
                                        : 'hover:bg-gray-50 text-gray-900'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(chat.peer.gender)} flex items-center justify-center text-white shrink-0 mr-3 relative shadow-sm`}>
                                        <span className="font-bold text-lg uppercase">{chat.peer.alias.charAt(0)}</span>
                                        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${onlineUserIds.includes(chat.peer.id) ? 'bg-primary' : 'bg-red-400'}`} />
                                    </div>

                                    <div className="flex-1 text-left min-w-0">
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-base truncate pr-2">{chat.peer.alias}</h3>
                                            <span className="text-[11px] text-gray-400 font-medium shrink-0">{getLastTime(chat.messages)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500 truncate flex-1 pr-2">{getLastMessage(chat.messages)}</p>
                                            {chat.unreadCount > 0 && (
                                                <div className="min-w-[20px] h-5 px-1.5 bg-primary rounded-full flex items-center justify-center shrink-0">
                                                    <span className="text-[10px] font-bold text-white leading-none">{chat.unreadCount}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {filteredContent.rooms.length === 0 && filteredContent.chats.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                        <Icon name="Search_Magnifying_Glass" className="h-10 w-10 mb-2 opacity-20" />
                        <p className="text-sm">Nessun risultato trovato</p>
                    </div>
                )}
            </div>
        </div>
    );
}
