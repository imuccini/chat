
import React from 'react';

type Tab = 'room' | 'users' | 'chats' | 'settings';

interface BottomNavProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    usersCount: number;
    unreadChatsCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, usersCount, unreadChatsCount }) => {
    return (
        <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 h-[calc(65px+env(safe-area-inset-bottom,0px))] md:h-[75px] flex justify-around items-start pt-2 pb-safe shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">

            {/* Tab 1: Room */}
            <button
                onClick={() => onTabChange('room')}
                className={`flex flex-col items-center justify-center w-full h-full relative ${activeTab === 'room' ? 'text-emerald-600' : 'text-gray-400'}`}
            >
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'room' ? 2.5 : 2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {usersCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] flex items-center justify-center border border-white">
                            {usersCount}
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-medium mt-1">Stanza</span>
            </button>

            {/* Tab 2: Users */}
            <button
                onClick={() => onTabChange('users')}
                className={`flex flex-col items-center justify-center w-full h-full relative ${activeTab === 'users' ? 'text-emerald-600' : 'text-gray-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'users' ? 2.5 : 2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-[10px] font-medium mt-1">Utenti</span>
            </button>

            {/* Tab 3: Chats */}
            <button
                onClick={() => onTabChange('chats')}
                className={`flex flex-col items-center justify-center w-full h-full relative ${activeTab === 'chats' ? 'text-emerald-600' : 'text-gray-400'}`}
            >
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'chats' ? 2.5 : 2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {unreadChatsCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] flex items-center justify-center border border-white">
                            {unreadChatsCount}
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-medium mt-1">Chats</span>
            </button>

            {/* Tab 4: Settings */}
            <button
                onClick={() => onTabChange('settings')}
                className={`flex flex-col items-center justify-center w-full h-full relative ${activeTab === 'settings' ? 'text-emerald-600' : 'text-gray-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'settings' ? 2.5 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-[10px] font-medium mt-1">Me</span>
            </button>
        </nav>
    );
};

export default BottomNav;
