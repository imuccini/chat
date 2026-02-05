import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Hash, Megaphone } from 'lucide-react';
import { Room } from '../types'; // I'll need to update types.ts to export Room interface

interface RoomListProps {
    rooms: Room[];
    onSelectRoom: (roomId: string) => void;
    activeRoomId?: string;
}

export function RoomList({ rooms, onSelectRoom, activeRoomId }: RoomListProps) {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
            <header className="bg-white pt-safe sticky top-0 z-10 dark:bg-gray-900">
                <div className="h-[60px] px-4 flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Stanze</h1>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {rooms.map((room) => {
                    const isAnnouncement = room.type === 'ANNOUNCEMENT';
                    const Icon = isAnnouncement ? Megaphone : Hash;
                    const isActive = room.id === activeRoomId;

                    return (
                        <button
                            key={room.id}
                            onClick={() => onSelectRoom(room.id)}
                            className={`w-full flex items-center p-3 rounded-xl transition-all ${isActive
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'hover:bg-gray-50 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300'
                                }`}
                        >
                            <div className={`p-2 rounded-full mr-3 ${isActive
                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300'
                                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                <Icon size={20} />
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="font-semibold text-base">{room.name}</h3>
                                <p className="text-xs text-opacity-70 opacity-70 truncate max-w-[200px]">
                                    {isAnnouncement ? 'Annunci e messaggi ufficiali' : 'Discussione generale e chat pubblica'}
                                </p>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
