import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { columns } from '@/components/admin/tenants/columns';
import { DataTable } from '@/components/admin/tenants/data-table';
import { CreateTenantDialog } from '@/components/admin/tenants/TenantDialogs';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    if (!cookieStore.get('admin_session')) {
        redirect('/admin/login');
    }

    const tenants = await prisma.tenant.findMany({
        include: { devices: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
                <CreateTenantDialog />
            </div>

            <DataTable columns={columns} data={tenants} />
        </div>
    );
}
