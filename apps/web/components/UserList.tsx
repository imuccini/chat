import React, { useState } from 'react';
import { User, Gender } from '@/types';
import { Icon } from './Icon';

interface UserListProps {
    currentUser: User;
    users: (User & { socketId: string })[];
    onStartChat: (targetUser: User) => void;
}

const UserList: React.FC<UserListProps> = ({ currentUser, users, onStartChat }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Deduplicate users by ID (in case of multiple socket connections)
    const uniqueUsers = Array.from(
        new Map(users.map(u => [u.id, u])).values()
    );

    // Filter out self and apply search query
    const otherUsers = uniqueUsers.filter(u =>
        u.id !== currentUser.id &&
        u.alias.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getAvatarColor = (gender: Gender) => {
        switch (gender) {
            case 'male': return 'bg-blue-500';
            case 'female': return 'bg-pink-500';
            default: return 'bg-purple-500';
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <header className="bg-white pt-safe sticky top-0 z-10 transition-all">
                <div className="h-[60px] px-4 flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Utenti</h1>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {users.length} Online
                    </span>
                </div>

                {/* Search Bar */}
                <div className="px-4 pb-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="Search_Magnifying_Glass" className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cerca utente per nome..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 rounded-xl leading-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-transparent sm:text-sm transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-[80px]">
                {otherUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p className="text-center font-medium">
                            {searchQuery ? 'Nessun utente trovato.' : 'Nessun altro utente online al momento.'}
                        </p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {otherUsers.map(user => (
                            <li
                                key={user.id}
                                onClick={() => onStartChat(user)}
                                className="flex items-center gap-4 p-3 bg-white rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50 last:border-0 cursor-pointer group"
                            >
                                <div className="relative shrink-0">
                                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(user.gender)} flex items-center justify-center text-white shadow-sm overflow-hidden`}>
                                        {user.image ? (
                                            <img src={user.image} alt={user.alias} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="font-bold text-lg uppercase">{user.alias.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full z-10`}></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate text-base">{user.alias}</h3>
                                    <p className="text-sm text-gray-500 truncate">
                                        {user.status || <span className="capitalize">{user.gender}</span>}
                                    </p>
                                </div>
                                <div className="p-2 text-gray-300 group-hover:text-primary transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
};

export default UserList;
