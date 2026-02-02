"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTenantAction, updateTenantAction } from "@/app/actions/adminTenant"
import { TenantWithDevices } from "./columns" // Import type
import { useState } from "react"
import { useRouter } from "next/navigation"

export function CreateTenantDialog() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        await createTenantAction(formData);
        setOpen(false);
        router.refresh();
        // Reset form? Server action revalidate usually handles list update.
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create New Tenant</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Tenant</DialogTitle>
                    <DialogDescription>
                        Add a new tenant to the system.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" name="name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="slug" className="text-right">
                            Slug
                        </Label>
                        <Input id="slug" name="slug" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nasIds" className="text-right">
                            NAS IDs
                        </Label>
                        <Input id="nasIds" name="nasIds" placeholder="Comma separated" className="col-span-3" />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

interface EditTenantProps {
    tenant: TenantWithDevices;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditTenantDialog({ tenant, open, onOpenChange }: EditTenantProps) {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        await updateTenantAction(formData);
        onOpenChange(false);
        router.refresh();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Tenant</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <input type="hidden" name="id" value={tenant.id} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">Name</Label>
                        <Input id="edit-name" name="name" defaultValue={tenant.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-slug" className="text-right">Slug</Label>
                        <Input id="edit-slug" name="slug" defaultValue={tenant.slug} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-nasIds" className="text-right">NAS IDs</Label>
                        <Input
                            id="edit-nasIds"
                            name="nasIds"
                            defaultValue={tenant.devices.map(d => d.nasId).join(', ')}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
