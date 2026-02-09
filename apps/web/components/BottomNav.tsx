import { Icon } from './Icon';
import { useMembership } from '@/hooks/useMembership';

type Tab = 'chats' | 'users' | 'local' | 'settings' | 'admin';

interface BottomNavProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    usersCount: number;
    unreadChatsCount: number;
    tenantId?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, usersCount, unreadChatsCount, tenantId }) => {
    const { isAdmin } = useMembership(tenantId);

    return (
        <nav className="bg-white fixed bottom-0 left-0 right-0 z-50 h-[calc(70px+env(safe-area-inset-bottom,0px))] md:h-[80px] flex justify-around items-start pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+8px)]">

            {/* Tab 1: Chats (Unified) */}
            <button
                onClick={() => onTabChange('chats')}
                className={`flex flex-col items-center justify-center w-full relative ${activeTab === 'chats' ? 'text-primary' : 'text-black'}`}
            >
                <div className="relative">
                    <Icon name="Chat" className="h-6 w-6 md:h-7 md:w-7" />
                    {unreadChatsCount > 0 && (
                        <span className="absolute -top-0.5 -right-1.5 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] flex items-center justify-center border-2 border-white leading-none">
                            {unreadChatsCount}
                        </span>
                    )}
                </div>
                <span className={`text-[10px] mt-1 ${activeTab === 'chats' ? 'font-bold' : 'font-semibold'}`}>Chats</span>
            </button>

            {/* Tab 2: Users */}
            <button
                onClick={() => onTabChange('users')}
                className={`flex flex-col items-center justify-center w-full relative ${activeTab === 'users' ? 'text-primary' : 'text-black'}`}
            >
                <Icon name="Users_Group" className="h-6 w-6 md:h-7 md:w-7" />
                <span className={`text-[10px] mt-1 ${activeTab === 'users' ? 'font-bold' : 'font-semibold'}`}>Utenti</span>
            </button>

            {/* Tab 3: Local */}
            <button
                onClick={() => onTabChange('local')}
                className={`flex flex-col items-center justify-center w-full relative ${activeTab === 'local' ? 'text-primary' : 'text-black'}`}
            >
                <Icon name="Building_01" className="h-6 w-6 md:h-7 md:w-7" />
                <span className={`text-[10px] mt-1 ${activeTab === 'local' ? 'font-bold' : 'font-semibold'}`}>Local</span>
            </button>


            {/* Tab 4: Settings */}
            <button
                onClick={() => onTabChange('settings')}
                className={`flex flex-col items-center justify-center w-full relative ${activeTab === 'settings' ? 'text-primary' : 'text-black'}`}
            >
                <Icon name="Settings" className="h-6 w-6 md:h-7 md:w-7" />
                <span className={`text-[10px] mt-1 ${activeTab === 'settings' ? 'font-bold' : 'font-semibold'}`}>Profilo</span>
            </button>

            {/* Tab 5: Admin - REMOVED (admin dashboard reserved for superadmins) */}

        </nav>
    );
};

export default BottomNav;
