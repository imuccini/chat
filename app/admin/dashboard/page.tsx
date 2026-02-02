import { prisma } from '@/lib/db';
import { createTenantAction, deleteTenantAction, updateTenantAction } from '@/app/actions/adminTenant';
import { logoutAction } from '@/app/actions/adminAuth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <form action={logoutAction}>
                    <button className="text-red-600 hover:text-red-800">Logout</button>
                </form>
            </nav>

            <main className="max-w-6xl mx-auto p-8">
                <div className="bg-white p-6 rounded shadow mb-8">
                    <h2 className="text-lg font-semibold mb-4">Create New Tenant</h2>
                    <form action={createTenantAction} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input name="name" placeholder="Tenant Name" required className="border p-2 rounded" />
                        <input name="slug" placeholder="URL Slug" required className="border p-2 rounded" />
                        <input name="nasIds" placeholder="NAS IDs (comma separated)" className="border p-2 rounded" />
                        <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Create</button>
                    </form>
                </div>

                <div className="grid gap-6">
                    {tenants.map(tenant => (
                        <div key={tenant.id} className="bg-white p-6 rounded shadow relative">
                            <form action={deleteTenantAction} className="absolute top-4 right-4">
                                <input type="hidden" name="id" value={tenant.id} />
                                <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                            </form>

                            <form action={updateTenantAction} className="space-y-4">
                                <input type="hidden" name="id" value={tenant.id} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-gray-500 mb-1">Name</label>
                                        <input name="name" defaultValue={tenant.name} className="w-full border p-2 rounded" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-gray-500 mb-1">Slug</label>
                                        <input name="slug" defaultValue={tenant.slug} className="w-full border p-2 rounded" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-gray-500 mb-1">NAS IDs (Comma Separated)</label>
                                    <input
                                        name="nasIds"
                                        defaultValue={tenant.devices.map(d => d.nasId).join(', ')}
                                        className="w-full border p-2 rounded font-mono text-sm"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Update</button>
                                </div>
                            </form>
                        </div>
                    ))}
                    {tenants.length === 0 && <p className="text-gray-500 text-center">No tenants found.</p>}
                </div>
            </main>
        </div>
    );
}
