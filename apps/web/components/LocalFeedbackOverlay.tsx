'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Tenant, Feedback, User } from '@/types';
import { Button } from './ui/button';
import { Star, MessageSquare, Calendar, User as UserIcon, CheckCircle2, XCircle } from 'lucide-react';
import { clientSubmitFeedback, clientGetFeedback } from '@/services/apiService';
import { Textarea } from '@/components/ui/textarea';
import { useKeyboardAnimation } from '@/hooks/useKeyboardAnimation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

interface LocalFeedbackOverlayProps {
    tenant: Tenant;
    isAdmin: boolean;
    userId?: string;
    onClose: () => void;
}

export const LocalFeedbackOverlay: React.FC<LocalFeedbackOverlayProps> = ({
    tenant,
    isAdmin,
    userId,
    onClose
}) => {
    const [view, setView] = useState<'submit' | 'list'>(isAdmin ? 'list' : 'submit');
    const [score, setScore] = useState<number>(10);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [resultDialog, setResultDialog] = useState<{ open: boolean; success: boolean }>({ open: false, success: false });
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { contentStyle } = useKeyboardAnimation();

    const handleFocus = () => {
        // Small delay to allow keyboard to start sliding up
        setTimeout(() => {
            textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    };

    useEffect(() => {
        if (view === 'list') {
            loadFeedbacks();
        }
    }, [view]);

    const loadFeedbacks = async () => {
        setIsLoading(true);
        try {
            const data = await clientGetFeedback(tenant.slug, userId);
            setFeedbacks(data);
        } catch (error) {
            console.error("Failed to load feedbacks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await clientSubmitFeedback(tenant.slug, score, comment, userId);
            setResultDialog({ open: true, success: true });
        } catch (error) {
            console.error("Failed to submit feedback:", error);
            setResultDialog({ open: true, success: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDialogClose = () => {
        setResultDialog({ open: false, success: false });
        if (resultDialog.success) {
            onClose();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-hidden w-full">
            {/* Header */}
            <header className="bg-white pt-safe border-b border-gray-100 shrink-0 sticky top-0 z-10">
                <div className="h-[60px] px-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="font-extrabold text-2xl text-gray-900 leading-tight tracking-tight">Feedback</h1>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                <p className="text-[11px] font-bold text-primary uppercase tracking-wide truncate max-w-[150px]">
                                    {tenant.name}
                                </p>
                            </div>
                        </div>
                    </div>
                    {isAdmin && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setView(view === 'submit' ? 'list' : 'submit')}
                            className="text-primary font-bold text-xs"
                        >
                            {view === 'submit' ? 'Leggi commenti' : 'Invia feedback'}
                        </Button>
                    )}
                </div>
            </header>

            {/* Content Area */}
            <div
                className="flex-1 overflow-auto p-4"
                style={contentStyle}
            >
                {view === 'submit' ? (
                    <div className="max-w-md mx-auto space-y-8 py-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-xl font-bold text-gray-900">Come valuteresti la tua esperienza?</h2>
                            <p className="text-sm text-gray-500">Il tuo feedback ci aiuta a migliorare il servizio.</p>
                        </div>

                        {/* NPS Scale */}
                        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setScore(num)}
                                    className={`aspect-square rounded-xl flex items-center justify-center font-bold text-lg transition-all shadow-sm border ${score === num
                                        ? 'bg-primary text-white border-primary scale-110'
                                        : 'bg-white text-gray-600 border-gray-100 hover:border-primary/30'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between px-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <span>Per nulla pronto</span>
                            <span>Molto pronto</span>
                        </div>

                        {/* Comment */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-2 text-gray-900 font-bold">
                                <MessageSquare className="w-4 h-4 text-primary" />
                                <h3>Lascia un commento</h3>
                            </div>
                            <Textarea
                                ref={textareaRef}
                                onFocus={handleFocus}
                                placeholder="Scrivi qui i tuoi suggerimenti o commenti..."
                                className="min-h-[120px] rounded-xl border-gray-100 shadow-sm focus:ring-primary/20 bg-white"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>

                        <Button
                            className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? 'Invio in corso...' : 'Invia Recensione'}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 max-w-2xl mx-auto py-2">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <p className="text-gray-400 font-medium">Caricamento feedback...</p>
                            </div>
                        ) : feedbacks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 space-y-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <MessageSquare className="w-8 h-8 opacity-20" />
                                </div>
                                <p className="font-medium">Nessun feedback ancora ricevuto.</p>
                            </div>
                        ) : (
                            feedbacks.map((f) => (
                                <FeedbackItem key={f.id} feedback={f} />
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Result Dialog */}
            <Dialog open={resultDialog.open} onOpenChange={(open) => { if (!open) handleDialogClose(); }}>
                <DialogContent className="rounded-2xl max-w-[320px]">
                    <DialogHeader className="items-center text-center pt-2">
                        {resultDialog.success ? (
                            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-2">
                                <CheckCircle2 className="w-9 h-9 text-green-500" />
                            </div>
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-2">
                                <XCircle className="w-9 h-9 text-red-500" />
                            </div>
                        )}
                        <DialogTitle className="text-lg">
                            {resultDialog.success ? 'Grazie!' : 'Errore'}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            {resultDialog.success
                                ? 'Il tuo feedback è stato inviato con successo. Grazie per averci aiutato a migliorare!'
                                : "Si è verificato un errore durante l'invio del feedback. Riprova più tardi."}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center pt-2">
                        <Button
                            onClick={handleDialogClose}
                            className="w-full rounded-xl font-bold"
                        >
                            {resultDialog.success ? 'Chiudi' : 'Ho capito'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const FeedbackItem: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <UserIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 leading-none">{feedback.user?.alias || 'Utente'}</h4>
                        <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span className="text-[10px] font-medium uppercase tracking-wider">
                                {new Date(feedback.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bg-primary/5 text-primary px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm border border-primary/10">
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    {feedback.score}
                </div>
            </div>
            {feedback.comment && (
                <div className="bg-gray-50/50 p-3 rounded-xl">
                    <p className="text-sm text-gray-700 leading-relaxed italic">"{feedback.comment}"</p>
                </div>
            )}
        </div>
    );
};
