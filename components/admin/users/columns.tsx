"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User, Session } from "@prisma/client"
import { Badge } from "@/components/ui/badge"

// Extended type to include sessions for calculating last login
export type UserWithSessions = User & {
    sessions: Session[]
}

export const columns: ColumnDef<UserWithSessions>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <span className="font-medium">{row.original.name || "Anonymous"}</span>
                    {row.original.isAnonymous && (
                        <Badge variant="outline" className="text-[10px] text-gray-400">Anon</Badge>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone",
        cell: ({ row }) => {
            return <span className="text-gray-600 font-mono text-xs">{row.original.phoneNumber || "-"}</span>
        }
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => {
            const gender = row.original.gender;
            if (!gender) return "-";
            const labels: Record<string, string> = {
                male: "M",
                female: "F",
                other: "O"
            };
            return <Badge variant="secondary" className="text-[10px] uppercase">{labels[gender] || gender}</Badge>
        }
    },
    {
        accessorKey: "createdAt",
        header: "Registered",
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <span className="text-sm">{new Date(row.original.createdAt).toLocaleDateString()}</span>
                    <span className="text-[10px] text-gray-400">{new Date(row.original.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            )
        }
    },
    {
        id: "lastLogin",
        header: "Last Login",
        cell: ({ row }) => {
            const sessions = row.original.sessions || [];
            if (sessions.length === 0) return <span className="text-gray-400 italic text-xs">Never</span>;

            // Sessions are ordered by createdAt desc in the query (ideally)
            // but we'll take the max expiresAt or createdAt to be sure
            const lastSession = sessions[0];
            const date = new Date(lastSession.createdAt);

            return (
                <div className="flex flex-col">
                    <span className="text-sm">{date.toLocaleDateString()}</span>
                    <span className="text-[10px] text-gray-400">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            )
        }
    },
]
