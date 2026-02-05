import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getAdminKpis } from '@/lib/kpi';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Activity } from "lucide-react";
import { KpiDashboard } from '@/components/admin/charts/KpiDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    if (!cookieStore.get('admin_session')) {
        redirect('/admin/login');
    }

    const kpis = await getAdminKpis();

    return (
        <div className="space-y-12">
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white/50 backdrop-blur-sm border-emerald-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.totalUsers}</div>
                        <p className="text-xs text-gray-500 mt-1">Registered accounts</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/50 backdrop-blur-sm border-blue-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Messages</CardTitle>
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.totalMessages}</div>
                        <p className="text-xs text-gray-500 mt-1">Exchanged to date</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/50 backdrop-blur-sm border-orange-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Active (24h)</CardTitle>
                        <Activity className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Object.values(kpis.tenantActiveCounts).reduce((a, b) => a + b, 0)}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Unique active users</p>
                    </CardContent>
                </Card>
            </div>

            <KpiDashboard trends={kpis.trends} split={kpis.split} />
        </div>
    );
}
