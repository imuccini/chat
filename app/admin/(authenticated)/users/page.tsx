import { prisma } from '@/lib/db';
import { columns } from '@/components/admin/users/columns';
import { DataTable } from '@/components/admin/tenants/data-table';
import { Users } from "lucide-react";

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
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between h-10">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
                        <Users className="h-6 w-6 text-blue-500" />
                        Registered Users
                    </h2>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden px-1">
                    <DataTable columns={columns} data={users} />
                </div>
            </div>
        </div>
    );
}
