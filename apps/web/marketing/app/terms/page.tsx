import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center text-emerald-600 font-medium mb-12 hover:gap-2 transition-all">
                    ← Torna alla Home
                </Link>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Terms of Use</h1>

                <div className="prose prose-emerald lg:prose-lg max-w-none text-gray-600 space-y-6">
                    <p className="text-xl text-gray-500">
                        Benvenuto su Local. Utilizzando il nostro servizio, accetti i seguenti termini.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Utilizzo del Servizio</h2>
                        <p>
                            Local è una piattaforma di chat locale. Sei responsabile dei contenuti che pubblichi. Ti chiediamo di mantenere un comportamento rispettoso verso gli altri utenti.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Contenuti Vietati</h2>
                        <p>
                            È vietato pubblicare contenuti illegali, offensivi, discriminatori o che violino la privacy di terzi. Ci riserviamo il diritto di rimuovere tali contenuti e limitare l'accesso agli utenti che violano queste regole.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Limitazione di Responsabilità</h2>
                        <p>
                            Local viene fornito "così com'è". Pur facendo il massimo per garantire la stabilità del servizio, non siamo responsabili per eventuali perdite di dati o interruzioni.
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
