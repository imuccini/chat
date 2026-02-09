import React from 'react';
import { Tenant } from '@/types';
import { Icon } from './Icon';
import { API_BASE_URL } from '@/config';

interface LocalSectionProps {
    tenant: Tenant;
    isAdmin?: boolean;
    token?: string;
}

export const LocalSection: React.FC<LocalSectionProps> = ({ tenant, isAdmin, token }) => {
    const services = [
        {
            id: 'menu',
            title: 'Menu',
            icon: 'Menu_Alt_01',
            description: 'Sfoglia il nostro menu digitale'
        },
        {
            id: 'feedback',
            title: 'Lasciaci un feedback',
            icon: 'List_Checklist',
            description: 'La tua opinione è importante per noi'
        },
        {
            id: 'staff',
            title: 'Scrivi allo staff',
            icon: 'Chat_Conversation',
            description: 'Hai bisogno di aiuto? Contattaci subito'
        }
    ];

    const [isEditOpen, setIsEditOpen] = React.useState(false);

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-y-auto w-full">
            {/* Header Section */}
            <div className="bg-white px-6 pt-12 pb-8 rounded-b-[3rem] shadow-sm border-b border-gray-100 mb-6 relative group">
                {/* Admin Edit Button */}
                {isAdmin && (
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors z-10"
                    >
                        <Icon name="Edit_02" className="w-5 h-5" />
                    </button>
                )}

                <div className="flex flex-col items-center">
                    <button
                        disabled={!isAdmin}
                        onClick={() => isAdmin && setIsEditOpen(true)}
                        className={`w-28 h-28 mb-6 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm ring-4 ring-white relative ${isAdmin ? 'cursor-pointer hover:ring-primary/20 transition-all' : ''}`}
                    >
                        {tenant.logoUrl ? (
                            <img
                                src={tenant.logoUrl}
                                alt={tenant.name}
                                className="w-full h-full object-contain p-6"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                <Icon name="Building_01" className="w-12 h-12 text-gray-300" />
                            </div>
                        )}

                        {isAdmin && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <Icon name="Camera" className="w-8 h-8 text-white" />
                            </div>
                        )}
                    </button>

                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-center">
                        {tenant.name}
                    </h1>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full mt-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Sei nel locale</span>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="px-5 pb-24">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 ml-1">
                    Servizi Disponibili
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            className="group relative flex items-center gap-4 p-5 bg-white rounded-[2rem] border border-gray-100 shadow-sm transition-all duration-300 active:scale-[0.97] active:bg-gray-50 max-w-full"
                        >
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors duration-300 shrink-0">
                                <Icon name={service.icon} className="w-7 h-7" />
                            </div>

                            <div className="flex flex-col text-left overflow-hidden">
                                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 truncate">
                                    {service.title}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium truncate">
                                    {service.description}
                                </p>
                            </div>

                            <div className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-gray-300 shrink-0">
                                <Icon name="Arrow_Right_SM" className="w-5 h-5" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Edit Dialog */}
            {isAdmin && <EditTenantDialog
                tenant={tenant}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                token={token}
            />}
        </div>
    );
};

// Inline Dialog Component to avoid circular deps or complex imports for now
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

function EditTenantDialog({ tenant, open, onOpenChange, token }: { tenant: Tenant, open: boolean, onOpenChange: (open: boolean) => void, token?: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    // We need to implement client-side form submission to nicely handle the Loading state and feedback
    // standard 'action' prop on form is great but generic loading state requires useFormStatus which needs a separate component.
    // Let's use standard onSubmit handler for finer control here.

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            const logoFile = formData.get('logo') as File;

            let logoUrl: string | undefined = undefined;
            if (logoFile && logoFile.size > 0) {
                logoUrl = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(logoFile);
                });
            }

            // On web: uses Next.js proxy (same-origin, auth via cookies)
            // On native: uses NestJS directly (auth via session token in header)
            const isNative = typeof window !== 'undefined' && window.location.protocol === 'capacitor:';
            const fetchHeaders: Record<string, string> = {
                'Content-Type': 'application/json',
            };
            if (isNative && token) {
                fetchHeaders['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_BASE_URL}/api/tenants/${tenant.slug}`, {
                method: 'POST',
                headers: fetchHeaders,
                credentials: 'include',
                body: JSON.stringify({
                    id: tenant.id,
                    name,
                    logoUrl
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update tenant');
            }

            onOpenChange(false);
            // Force a refresh to show new data
            window.location.reload();
        } catch (error) {
            console.error("Failed to update tenant:", error);
            alert("Failed to update tenant settings");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifica Locale</DialogTitle>
                    <DialogDescription>
                        Modifica il nome e il logo del tuo locale.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <input type="hidden" name="tenantId" value={tenant.id} />

                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome Locale</Label>
                        <Input id="name" name="name" defaultValue={tenant.name} required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="logo">Logo (Opzionale)</Label>
                        <div className="flex items-center gap-4">
                            {tenant.logoUrl && (
                                <img src={tenant.logoUrl} alt="Current" className="w-10 h-10 object-contain rounded-full border" />
                            )}
                            <Input id="logo" name="logo" type="file" accept="image/*" className="flex-1" />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                            Annulla
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Salvataggio...' : 'Salva Modifiche'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default LocalSection;
