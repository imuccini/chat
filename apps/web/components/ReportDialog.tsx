'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

interface ReportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    peerAlias: string;
    onSubmit: (reason: string, details?: string) => void;
}

const REASONS = [
    { value: 'spam', label: 'Spam' },
    { value: 'harassment', label: 'Molestie' },
    { value: 'inappropriate', label: 'Contenuto inappropriato' },
    { value: 'other', label: 'Altro' },
];

export function ReportDialog({ open, onOpenChange, peerAlias, onSubmit }: ReportDialogProps) {
    const [reason, setReason] = useState<string>('');
    const [details, setDetails] = useState('');

    const handleSubmit = () => {
        if (!reason) return;
        onSubmit(reason, details.trim() || undefined);
        setReason('');
        setDetails('');
        onOpenChange(false);
    };

    const handleOpenChange = (value: boolean) => {
        if (!value) {
            setReason('');
            setDetails('');
        }
        onOpenChange(value);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-sm mx-auto rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Segnala {peerAlias}</DialogTitle>
                    <DialogDescription>
                        Seleziona il motivo della segnalazione. Il nostro team la esaminer&agrave; il prima possibile.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                    {REASONS.map((r) => (
                        <button
                            key={r.value}
                            onClick={() => setReason(r.value)}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                                reason === r.value
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>

                {reason === 'other' && (
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Descrivi il problema..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary resize-none"
                        rows={3}
                    />
                )}

                <DialogFooter className="flex-row gap-2 sm:gap-2">
                    <button
                        onClick={() => handleOpenChange(false)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Annulla
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!reason}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Invia segnalazione
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
