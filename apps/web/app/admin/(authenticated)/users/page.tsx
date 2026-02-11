import { prisma } from '@/lib/db';
import { columns } from '@/components/admin/users/columns';
import { UserDataTable } from '@/components/admin/users/user-data-table';
import { Users } from "lucide-react";
import { CreateUserDialog } from '@/components/admin/users/UserDialogs';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
    const users = await prisma.user.findMany({
        include: {
            sessions: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                        <Users className="h-7 w-7 text-blue-600" />
                        Registered Users
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage all registered users, anonymous guests, and their session history.
                    </p>
                </div>
                <CreateUserDialog />
            </div>

            <div className="flex-1 min-h-0">
                <UserDataTable columns={columns} data={users as any} />
            </div>
        </div>
    );
}
