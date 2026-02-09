"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Tenant, NasDevice } from "@prisma/client"
import { MoreHorizontal, Pencil, Trash, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteTenantAction, initRoomsAction } from "@/app/actions/adminTenant"

// Extended type to include devices, members and KPIs
export type TenantWithDevices = Tenant & {
    devices: NasDevice[]
    members?: any[] // Detailed memberships (any used because of complex joined type)
    activeUsersCount?: number
}

import { EditTenantDialog } from "./TenantDialogs"
import { MemberManagement } from "./MemberManagement"
import { RoomManagement } from "./RoomManagement"
import { useState } from "react"
import { useRouter } from "next/navigation"

export const columns: ColumnDef<TenantWithDevices>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "activeUsersCount",
        header: "Active Users (24h)",
        cell: ({ row }) => {
            return <span className="font-medium">{row.original.activeUsersCount || 0}</span>
        }
    },
    {
        accessorKey: "devices",
        header: "NAS IDs",
        cell: ({ row }) => {
            const devices = row.original.devices || [];
            return <span>{devices.map(d => d.nasId).filter(Boolean).join(", ") || "-"}</span>
        }
    },
    {
        id: "bssids",
        header: "BSSIDs",
        cell: ({ row }) => {
            const devices = row.original.devices || [];
            const bssids = devices.map(d => d.bssid).filter(Boolean);
            if (bssids.length === 0) return <span className="text-muted-foreground">-</span>;
            return (
                <span className="text-xs font-mono">
                    {bssids.length > 2
                        ? `${bssids.slice(0, 2).join(", ")} +${bssids.length - 2}`
                        : bssids.join(", ")
                    }
                </span>
            );
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            return new Date(row.original.createdAt).toLocaleDateString()
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const tenant = row.original
            const [showEdit, setShowEdit] = useState(false)
            const router = useRouter();

            const handleDelete = async () => {
                if (confirm("Are you sure you want to delete this tenant?")) {
                    // We need to use server action but here inside event handler
                    // We can create a hidden form or call fetch wrapper
                    // Or simpler: just use a form inside the Cell? No, that breaks table layout.
                    // We can use a client component wrapper.
                    const formData = new FormData();
                    formData.append('id', tenant.id);
                    await deleteTenantAction(formData);
                    router.refresh();
                }
            }

            return (
                <div className="flex items-center gap-2">
                    <MemberManagement tenant={tenant} />
                    <RoomManagement tenantId={tenant.id} tenantName={tenant.name} />
                    <EditTenantDialog open={showEdit} onOpenChange={setShowEdit} tenant={tenant} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setShowEdit(true)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={async () => {
                                const formData = new FormData();
                                formData.append('tenantId', tenant.id);
                                try {
                                    await initRoomsAction(formData);
                                    router.refresh();
                                    alert('Rooms initialized successfully!');
                                } catch (e: any) {
                                    alert(e.message || 'Failed to init rooms');
                                }
                            }}>
                                <Home className="mr-2 h-4 w-4" /> Init Rooms
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Delete Tenant
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
