"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Trash2, UserPlus, Users } from "lucide-react"
import { addTenantMemberAction, removeTenantMemberAction } from "@/app/actions/adminTenant"
import { TenantWithDevices } from "./columns"
import { Badge } from "@/components/ui/badge"

interface MemberManagementProps {
    tenant: any; // Using any for now to avoid complex type drift
}

export function MemberManagement({ tenant }: MemberManagementProps) {
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    // Fetch all users to populate the select
    useEffect(() => {
        if (open) {
            async function fetchUsers() {
                setLoading(true)
                try {
                    const response = await fetch('/api/admin/users')
                    const data = await response.json()
                    setUsers(data)
                } catch (error) {
                    console.error("Failed to fetch users:", error)
                } finally {
                    setLoading(false)
                }
            }
            fetchUsers()
        }
    }, [open])

    const handleAddMember = async (formData: FormData) => {
        await addTenantMemberAction(formData)
        // Note: Ideally refresh tenant data here or rely on server refresh
    }

    const handleRemoveMember = async (id: string) => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('tenantId', tenant.id)
        await removeTenantMemberAction(formData)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Manage Members
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Manage Members for {tenant.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* List Existing Members */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Current Members</h3>
                        <div className="border rounded-lg divide-y">
                            {tenant.members?.length > 0 ? (
                                tenant.members.map((m: any) => (
                                    <div key={m.id} className="flex items-center justify-between p-3 bg-white">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{m.user.name || m.user.phoneNumber}</span>
                                            <div className="flex gap-2 mt-1">
                                                <Badge variant="secondary" className="text-[10px]">{m.role}</Badge>
                                                {m.canModerate && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none text-[10px]">Mod</Badge>}
                                                {m.canManageOrders && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none text-[10px]">Orders</Badge>}
                                                {m.canViewStats && <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px]">Stats</Badge>}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleRemoveMember(m.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-400 italic">No members assigned yet.</div>
                            )}
                        </div>
                    </div>

                    {/* Add New Member Form */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Add New Member
                        </h3>
                        <form action={handleAddMember} className="space-y-4">
                            <input type="hidden" name="tenantId" value={tenant.id} />

                            <div className="grid gap-2">
                                <Label htmlFor="userId">Select User</Label>
                                <Select name="userId" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder={loading ? "Loading users..." : "Select a user"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map(u => (
                                            <SelectItem key={u.id} value={u.id}>
                                                {u.name || u.phoneNumber} ({u.phoneNumber})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select name="role" defaultValue="MODERATOR">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="OWNER">OWNER</SelectItem>
                                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                                            <SelectItem value="MODERATOR">MODERATOR</SelectItem>
                                            <SelectItem value="STAFF">STAFF</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="canModerate" name="canModerate" />
                                    <Label htmlFor="canModerate">Moderation</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="canManageOrders" name="canManageOrders" />
                                    <Label htmlFor="canManageOrders">Orders</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="canViewStats" name="canViewStats" />
                                    <Label htmlFor="canViewStats">View Stats</Label>
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-2">Add Member</Button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
