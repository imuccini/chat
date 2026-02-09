'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const MESSAGES = [
    "Sto cercando uno spazio local...",
    "Quasi pronto...",
    "Configurazione in corso...",
    "Connessione al server...",
];

export function DiscoveryScreen() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
            {/* Animated Ripple Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 bg-primary/10 rounded-full animate-ripple" />
                <div className="w-32 h-32 bg-primary/10 rounded-full animate-ripple-delayed absolute" />
            </div>

            {/* Centered Logo Container */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center animate-fade-slide-up bg-white shadow-sm ring-4 ring-white/50">
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

                {/* Rotating Status Messages */}
                <div className="h-6 overflow-hidden">
                    <p className="text-gray-500 font-medium animate-fade-slide-up key={messageIndex}">
                        {MESSAGES[messageIndex]}
                    </p>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="absolute bottom-12 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    Powered by
                </span>
                <span className="text-lg font-bold text-gray-900 tracking-tight">
                    Local
                </span>
            </div>
        </div>
    );
}
