'use server';

import { getAdminKpis } from '@/lib/kpi';

export async function fetchAdminKpisAction() {
    return await getAdminKpis();
}
