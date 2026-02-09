"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, MessageSquare, Loader2, Check, X } from "lucide-react"
import { getTenantRoomsAction, updateRoomNameAction } from "@/app/actions/adminRoom"
import { Badge } from "@/components/ui/badge"

interface RoomManagementProps {
    tenantId: string;
    tenantName: string;
}

interface Room {
    id: string;
    name: string;
    type: string;
    description: string | null;
}

export function RoomManagement({ tenantId, tenantName }: RoomManagementProps) {
    const [open, setOpen] = useState(false)
    const [rooms, setRooms] = useState<Room[]>([])
    const [loading, setLoading] = useState(false)
    const [editingRoomId, setEditingRoomId] = useState<string | null>(null)
    const [editName, setEditName] = useState("")
    const [saving, setSaving] = useState(false)

    // Load rooms when dialog opens
    const loadRooms = async () => {
        setLoading(true)
        try {
            const data = await getTenantRoomsAction(tenantId)
            setRooms(data)
        } catch (error) {
            console.error("Failed to load rooms:", error)
        } finally {
            setLoading(false)
        }
    }

    const startEditing = (room: Room) => {
        setEditingRoomId(room.id)
        setEditName(room.name)
    }

    const cancelEditing = () => {
        setEditingRoomId(null)
        setEditName("")
    }

    const saveRoomName = async () => {
        if (!editingRoomId || !editName.trim()) return

        setSaving(true)
        try {
            await updateRoomNameAction(editingRoomId, editName)
            // Update local state
            setRooms(prev => prev.map(r => r.id === editingRoomId ? { ...r, name: editName } : r))
            setEditingRoomId(null)
        } catch (error) {
            console.error("Failed to update room:", error)
            alert("Failed to update room name")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (val) loadRooms();
        }}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <span className="sr-only">Manage Rooms</span>
                    <MessageSquare className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Manage Rooms for {tenantName}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                    ) : rooms.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 italic">
                            No rooms found for this tenant.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {rooms.map(room => (
                                <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex-1 mr-4">
                                        {editingRoomId === room.id ? (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="h-8 text-sm"
                                                    autoFocus
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="h-8 w-8 text-green-600 shrink-0"
                                                    onClick={saveRoomName}
                                                    disabled={saving}
                                                >
                                                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-gray-500 shrink-0"
                                                    onClick={cancelEditing}
                                                    disabled={saving}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm text-gray-900">{room.name}</span>
                                                <Badge variant="outline" className="text-[10px] h-5 px-1.5 text-gray-500">
                                                    {room.type}
                                                </Badge>
                                            </div>
                                        )}
                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                            {room.description || "No description"}
                                        </p>
                                    </div>

                                    {!editingRoomId && (
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-gray-400 hover:text-gray-700"
                                            onClick={() => startEditing(room)}
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
