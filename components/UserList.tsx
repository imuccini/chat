import React, { useState } from 'react';
import { User, Gender } from '@/types';

interface UserListProps {
    currentUser: User;
    users: (User & { socketId: string })[];
    onStartChat: (targetUser: User) => void;
}

const UserList: React.FC<UserListProps> = ({ currentUser, users, onStartChat }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter out self and apply search query
    const otherUsers = users.filter(u =>
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
            <header className="bg-white pt-safe border-b border-gray-100 sticky top-0 z-10 transition-all">
                <div className="h-[60px] px-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Utenti</h1>
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        {users.length} Online
                    </span>
                </div>

                {/* Search Bar */}
                <div className="px-4 pb-3">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Cerca utente per nome..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
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
                            <li key={user.id} className="flex items-center gap-4 p-3 bg-white rounded-xl active:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                                <div className={`w-12 h-12 rounded-full ${getAvatarColor(user.gender)} flex items-center justify-center text-white shrink-0 shadow-sm relative`}>
                                    <span className="font-bold text-lg uppercase">{user.alias.charAt(0)}</span>
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate text-base">{user.alias}</h3>
                                    <p className="text-sm text-gray-500 truncate">
                                        {user.status || <span className="capitalize">{user.gender}</span>}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onStartChat(user)}
                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
};

export default UserList;
