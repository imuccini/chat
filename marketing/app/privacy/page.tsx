import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center text-emerald-600 font-medium mb-12 hover:gap-2 transition-all">
                    ← Torna alla Home
                </Link>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-emerald lg:prose-lg max-w-none text-gray-600 space-y-6">
                    <p className="text-xl text-gray-500">
                        La tua privacy è fondamentale. Local è progettato per raccogliere il minimo indispensabile di dati per funzionare correttamente.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Dati Raccolti</h2>
                        <p>
                            Raccogliamo solo i dati necessari per la sessione di chat:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Informazioni di Connessione:</strong> Indirizzo IP e identificativi della rete WiFi per localizzarti nello spazio chat corretto.</li>
                            <li><strong>Profilo:</strong> Alias e preferenze (es. genere) che scegli di fornire.</li>
                            <li><strong>Messaggi:</strong> I contenuti che invii nella chat, memorizzati localmente sul tuo dispositivo e temporaneamente sul server per la sincronizzazione.</li>
                            <li><strong>Passkey:</strong> Se scegli di registrarti, memorizziamo la chiave pubblica per riconsoscerti. La chiave privata rimane sempre sul tuo dispositivo.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Come utilizziamo i dati</h2>
                        <p>
                            I dati vengono utilizzati esclusivamente per fornirti il servizio di chat locale e migliorare l'esperienza utente. Non vendiamo i tuoi dati a terzi.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Sicurezza</h2>
                        <p>
                            Utilizziamo standard di sicurezza moderni (HTTPS, crittografia per le Passkey) per garantire che la tua esperienza sia sicura e privata.
                        </p>
                    </section>

                    <footer className="pt-12 border-t border-gray-100 mt-12">
                        <p className="text-sm text-gray-400">Ultimo aggiornamento: Febbraio 2025</p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
