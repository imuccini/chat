"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Home, Users, Settings, LogOut, Activity } from "lucide-react"
import { logoutAction } from "@/app/actions/adminAuth"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AdminSidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const handleLogout = async () => {
        await logoutAction()
    }

    const routes = [
        {
            label: "Dashboard",
            icon: Home,
            href: "/admin/dashboard",
            active: pathname === "/admin/dashboard",
        },
        {
            label: "Tenants",
            icon: Activity,
            href: "/admin/tenants",
            active: pathname === "/admin/tenants",
        },
        {
            label: "Users",
            icon: Users,
            href: "/admin/users",
            active: pathname === "/admin/users",
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/admin/settings",
            active: pathname === "/admin/settings",
        },
    ]

    return (
        <div className={cn("pb-12 w-64 border-r bg-card h-screen fixed left-0 top-0", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="flex items-center px-4 mb-6">
                        <Bot className="mr-2 h-6 w-6" />
                        <h2 className="text-lg font-semibold tracking-tight">
                            Admin
                        </h2>
                    </div>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                className={cn("w-full justify-start", route.active && "bg-gray-100")}
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 left-0 w-full px-3">
                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
}
