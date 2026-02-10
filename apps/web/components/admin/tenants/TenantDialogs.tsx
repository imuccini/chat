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
import { Search, MapPin, Loader2, CheckCircle2 } from "lucide-react"

const GEO_API_URL = "https://geocoding.openapi.it/geocode";
const GEO_API_TOKEN = "698b0cfcc6e4bfc4b50470b6";

async function geocodeAddress(address: string) {
    const response = await fetch(GEO_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GEO_API_TOKEN}`
        },
        body: JSON.stringify({ address })
    });

    if (!response.ok) throw new Error("Connection error with geocoding service");
    const data = await response.json();
    if (data.success !== true || !data.element) {
        throw new Error("Address not found or invalid");
    }
    return data.element;
}

export function CreateTenantDialog() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [address, setAddress] = useState("");
    const [coords, setCoords] = useState<{ lat: string; lng: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleVerifyAddress = async () => {
        if (!address) return;
        setIsVerifying(true);
        try {
            const result = await geocodeAddress(address);
            setCoords({
                lat: result.latitude.toString(),
                lng: result.longitude.toString()
            });
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        await createTenantAction(formData);
        setOpen(false);
        setAddress("");
        setCoords(null);
        router.refresh();
    }

    if (!mounted) return <Button variant="outline" disabled>Create New Tenant</Button>;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create New Tenant</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Tenant</DialogTitle>
                    <DialogDescription>
                        Add a new tenant to the system.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="slug" className="text-right">Slug</Label>
                        <Input id="slug" name="slug" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="logo" className="text-right">Logo</Label>
                        <Input id="logo" name="logo" type="file" accept="image/*" className="col-span-3" />
                    </div>

                    <div className="border-t border-gray-100 my-2 pt-4">
                        <h4 className="text-sm font-semibold mb-4 px-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            Geolocation & Map
                        </h4>
                        <div className="grid grid-cols-4 items-center gap-4 mb-4">
                            <Label htmlFor="address" className="text-right">Address</Label>
                            <div className="col-span-3 flex gap-2">
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="Via Roma 1, Milano"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={handleVerifyAddress}
                                    disabled={isVerifying || !address}
                                >
                                    {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Coordinates</Label>
                            <div className="col-span-3 grid grid-cols-2 gap-2">
                                <Input
                                    name="latitude"
                                    placeholder="Latitudine"
                                    value={coords?.lat || ""}
                                    onChange={(e) => setCoords(prev => ({ ...prev!, lat: e.target.value }))}
                                />
                                <Input
                                    name="longitude"
                                    placeholder="Longitudine"
                                    value={coords?.lng || ""}
                                    onChange={(e) => setCoords(prev => ({ ...prev!, lng: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 my-2 pt-4">
                        <h4 className="text-sm font-semibold mb-2 px-4">Network Settings</h4>
                        <div className="grid grid-cols-4 items-start gap-4 mb-4">
                            <Label className="text-right pt-2">
                                NAS IDs
                            </Label>
                            <TagInput
                                name="nasIds"
                                placeholder="Captive portal NAS ID"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4 mb-4">
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
    const [isVerifying, setIsVerifying] = useState(false);
    const [address, setAddress] = useState(tenant.address || "");
    const [coords, setCoords] = useState<{ lat: string; lng: string } | null>(
        tenant.latitude && tenant.longitude ? {
            lat: tenant.latitude.toString(),
            lng: tenant.longitude.toString()
        } : null
    );
    const router = useRouter();

    const handleVerifyAddress = async () => {
        if (!address) return;
        setIsVerifying(true);
        try {
            const result = await geocodeAddress(address);
            setCoords({
                lat: result.latitude.toString(),
                lng: result.longitude.toString()
            });
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsVerifying(false);
        }
    };

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

                    <div className="border-t border-gray-100 my-2 pt-4">
                        <h4 className="text-sm font-semibold mb-4 px-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            Geolocation & Map
                        </h4>
                        <div className="grid grid-cols-4 items-center gap-4 mb-4">
                            <Label htmlFor="edit-address" className="text-right">Address</Label>
                            <div className="col-span-3 flex gap-2">
                                <Input
                                    id="edit-address"
                                    name="address"
                                    placeholder="Via Roma 1, Milano"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={handleVerifyAddress}
                                    disabled={isVerifying || !address}
                                >
                                    {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Coordinates</Label>
                            <div className="col-span-3 grid grid-cols-2 gap-2">
                                <Input
                                    name="latitude"
                                    placeholder="Latitudine"
                                    value={coords?.lat || ""}
                                    onChange={(e) => setCoords(prev => ({ ...prev!, lat: e.target.value }))}
                                />
                                <Input
                                    name="longitude"
                                    placeholder="Longitudine"
                                    value={coords?.lng || ""}
                                    onChange={(e) => setCoords(prev => ({ ...prev!, lng: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 my-2 pt-4">
                        <h4 className="text-sm font-semibold mb-2 px-4">Network Settings</h4>
                        <div className="grid grid-cols-4 items-start gap-4 mb-4">
                            <Label className="text-right pt-2">NAS IDs</Label>
                            <TagInput
                                name="nasIds"
                                defaultValue={existingNasIds}
                                placeholder="Captive portal NAS ID"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4 mb-4">
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
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
