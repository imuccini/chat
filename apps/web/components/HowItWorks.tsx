'use client';

import React from 'react';
import {
    MapPin,
    Wifi,
    ShieldCheck,
    UserCircle,
    MessagesSquare,
    ChevronLeft
} from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface StepProps {
    index: number;
    title: string;
    description: string;
    Icon: any;
}

const Step: React.FC<StepProps> = ({ index, title, description, Icon }) => (
    <div className="flex gap-4 items-start py-6 first:pt-2">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/5">
            <Icon className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">Step {index}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">{description}</p>
        </div>
    </div>
);

interface HowItWorksProps {
    onBack: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onBack }) => {
    const handleBack = () => {
        Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
        onBack();
    };

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in slide-in-from-right duration-300 ease-out">
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 pt-safe border-b border-gray-50">
                <div className="h-[60px] px-4 flex items-center">
                    <button
                        onClick={handleBack}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 active:scale-90"
                        aria-label="Indietro"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h1 className="ml-2 text-xl font-extrabold text-gray-900 tracking-tight">Come funziona</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-6 py-4">
                <div className="max-w-md mx-auto">
                    <div className="divide-y divide-gray-100/50">
                        <Step
                            index={1}
                            title="Raggiungi uno spazio Local"
                            description="Entra in un locale, o spazio convenzionato che espone il logo Local."
                            Icon={MapPin}
                        />
                        <Step
                            index={2}
                            title="Connettiti al Wi-Fi"
                            description="Cerca e connettiti alla rete Wi-Fi dello spazio. Di solito inizia con &quot;Local - ...&quot; (es. Local - Bar Centrale)."
                            Icon={Wifi}
                        />
                        <Step
                            index={3}
                            title="Riconoscimento Automatico"
                            description="Grazie al Wi-Fi e ai sensori BLE, l'app verifica capisce istantaneamente che sei &quot;dei nostri&quot;."
                            Icon={ShieldCheck}
                        />
                        <Step
                            index={4}
                            title="Scegli la tua Identità"
                            description="Entra come ospite con un alias anonimo oppure registrati con il tuo numero di telefono per mantenere il tuo profilo."
                            Icon={UserCircle}
                        />
                        <Step
                            index={5}
                            title="Inizia a chattare"
                            description="Scrivi nella stanza pubblica, invia messaggi privati o leggi gli avvisi ufficiali del gestore dello spazio."
                            Icon={MessagesSquare}
                        />
                    </div>

                    <div className="mt-8 mb-12 p-5 bg-gray-50 rounded-3xl border border-gray-100 flex gap-4 items-start">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100/50 shrink-0">
                            <ShieldCheck className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Privacy First</h4>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Local non traccia la tua posizione GPS. Usiamo solo i segnali presenti nello spazio per garantirti l'accesso.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
