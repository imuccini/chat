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
import { TagInput } from "@/components/ui/tag-input"
import { createTenantAction, updateTenantAction } from "@/app/actions/adminTenant"
import { TenantWithDevices } from "./columns" // Import type
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function CreateTenantDialog() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (formData: FormData) => {
        await createTenantAction(formData);
        setOpen(false);
        router.refresh();
    }

    if (!mounted) return <Button variant="outline" disabled>Create New Tenant</Button>;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create New Tenant</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
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
                        <Label htmlFor="logo" className="text-right">
                            Logo
                        </Label>
                        <Input id="logo" name="logo" type="file" accept="image/*" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">
                            NAS IDs
                        </Label>
                        <TagInput
                            name="nasIds"
                            placeholder="Captive portal NAS ID"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">
                            Public IPs
                        </Label>
                        <TagInput
                            name="publicIps"
                            placeholder="IP pubblico (es. 93.42.x.x)"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">
                            BSSIDs
                        </Label>
                        <TagInput
                            name="bssids"
                            placeholder="WiFi BSSID (es. AA:BB:CC:DD:EE:FF)"
                            className="col-span-3"
                        />
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

    // Extract existing values from devices
    const existingNasIds = tenant.devices
        .map(d => d.nasId)
        .filter((v): v is string => Boolean(v));
    const existingPublicIps = tenant.devices
        .map(d => d.publicIp)
        .filter((v): v is string => Boolean(v));
    const existingBssids = tenant.devices
        .map(d => d.bssid)
        .filter((v): v is string => Boolean(v));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
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
                        <Label htmlFor="edit-logo" className="text-right">Logo</Label>
                        <Input id="edit-logo" name="logo" type="file" accept="image/*" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">NAS IDs</Label>
                        <TagInput
                            name="nasIds"
                            defaultValue={existingNasIds}
                            placeholder="Captive portal NAS ID"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Public IPs</Label>
                        <TagInput
                            name="publicIps"
                            defaultValue={existingPublicIps}
                            placeholder="IP pubblico (es. 93.42.x.x)"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">BSSIDs</Label>
                        <TagInput
                            name="bssids"
                            defaultValue={existingBssids}
                            placeholder="WiFi BSSID (es. AA:BB:CC:DD:EE:FF)"
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
