'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const MESSAGES = [
    "Ricerca rete Local - WiFi...",
    "Analisi segnali Bluetooth...",
    "Ascolto beacon spaziali...",
    "Identificazione spazio Local...",
    "Connessione in corso...",
];

export function DiscoveryScreen() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
            {/* Centered Logo & Radar Complex - Shifted Up */}
            <div className="relative flex flex-col items-center gap-12 -translate-y-16">
                {/* Radar/Logo Container */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Animated Ripple Background - Concentric */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-full bg-primary/10 rounded-full animate-ripple" />
                        <div className="w-full h-full bg-primary/10 rounded-full animate-ripple-delayed absolute" />
                    </div>

                    {/* Centered Logo Circle */}
                    <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden flex items-center justify-center animate-fade-slide-up bg-white shadow-xl ring-4 ring-white">
                        <div className="relative w-full h-full">
                            <Image
                                src="/local_logo.svg"
                                alt="Local Logo"
                                fill
                                className="object-contain p-6"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Rotating Status Messages */}
                <div className="flex flex-col items-center gap-6">
                    <div className="h-8 flex items-center justify-center">
                        <p className="text-gray-500 font-bold text-lg animate-fade-slide-up" key={messageIndex}>
                            {MESSAGES[messageIndex]}
                        </p>
                    </div>

                    {/* Progress Bar - 10 Second Duration */}
                    <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gray-300 rounded-full"
                            style={{
                                animation: 'progress-fill 10s linear forwards'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="absolute bottom-12 flex flex-col items-center gap-1 opacity-50">
                <span className="text-[0.6rem] text-gray-400 uppercase tracking-widest font-black">
                    Powered by
                </span>
                <span className="text-sm font-black text-gray-900 tracking-tight">
                    Local
                </span>
            </div>
        </div>
    );
}
