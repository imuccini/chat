"use client"

import { useState, useEffect } from "react"
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
import { useRouter } from "next/navigation"
import { createUserAction } from "@/app/actions/adminUser"
import { UserPlus } from "lucide-react"

export function CreateUserDialog() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            await createUserAction(formData);
            setOpen(false);
            router.refresh();
        } catch (error: any) {
            alert(error.message || "Failed to create user");
        } finally {
            setIsLoading(false);
        }
    }

    if (!mounted) {
        return (
            <Button variant="outline" disabled className="gap-2">
                <UserPlus className="h-4 w-4" />
                Create New User
            </Button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4" />
                    Create New User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                    <DialogDescription>
                        Manually add a new user to the system. They will be able to log in using their phone number.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="create-name">Display Name</Label>
                        <Input
                            id="create-name"
                            name="name"
                            placeholder="John Doe"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="create-phone">Phone Number</Label>
                        <Input
                            id="create-phone"
                            name="phoneNumber"
                            placeholder="+39 340..."
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="create-email">Email (Optional)</Label>
                        <Input
                            id="create-email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            disabled={isLoading}
                        />
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                            {isLoading ? "Creating..." : "Create User"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
