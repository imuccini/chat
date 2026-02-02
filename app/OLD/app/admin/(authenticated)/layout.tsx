import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default function AdminAuthenticatedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar className="hidden md:block" />
            <div className="flex-1 md:ml-64">
                <main className="h-full py-6 px-8 bg-gray-50/50 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    )
}
