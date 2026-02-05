import { prisma } from '@/lib/db';
import { columns } from '@/components/admin/tenants/columns';
import { DataTable } from '@/components/admin/tenants/data-table';
import { CreateTenantDialog } from '@/components/admin/tenants/TenantDialogs';
import { getAdminKpis } from '@/lib/kpi';
import { Activity } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function TenantsPage() {
    const [tenants, kpis] = await Promise.all([
        prisma.tenant.findMany({
            include: { devices: true },
            orderBy: { createdAt: 'desc' }
        }),
        getAdminKpis()
    ]);

    const tenantsWithKpis = tenants.map(t => ({
        ...t,
        activeUsersCount: kpis.tenantActiveCounts[t.id] || 0
    }));

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
                        <Activity className="h-6 w-6 text-emerald-500" />
                        Tenants Management
                    </h2>
                    <CreateTenantDialog />
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden px-1">
                    <DataTable columns={columns} data={tenantsWithKpis} />
                </div>
            </div>
        </div>
    );
}
