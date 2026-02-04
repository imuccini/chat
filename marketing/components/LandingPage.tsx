'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Shield, Zap, Users, ArrowRight, Share2, Globe } from 'lucide-react';

interface LandingPageProps {
    onConnect: () => void;
}

export default function LandingPage({ onConnect }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-emerald-200 shadow-lg">
                                <img src="/local_logo.svg" alt="Local" className="w-5 h-5 brightness-0 invert" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900">Local</span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">Funzionalità</a>
                            <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">Come funziona</a>
                            <button
                                onClick={onConnect}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-emerald-100 shadow-xl active:scale-95"
                            >
                                Accedi alla Chat
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold mb-6 animate-fade-in">
                        <Zap className="w-3 h-3 fill-emerald-600" />
                        <span>NUOVO: ACCESSO TRAMITE PASSKEY</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">
                        Connettiti con chi ti sta intorno.
                    </h1>
                    <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        La chat locale istantanea per treni, aeroporti e spazi pubblici. Nessuna app da installare, nessuna registrazione obbligatoria. Solo tu e la rete locale.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onConnect}
                            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-emerald-200 shadow-2xl hover:-translate-y-1 active:scale-95 group"
                        >
                            Connettiti ora
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-sm text-gray-400">
                            Disponibile su tutte le reti WiFi abilitate.
                        </p>
                    </div>
                </div>

                {/* Abstract UI Preview */}
                <div className="mt-20 max-w-5xl mx-auto relative px-4">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50/50 p-2 sm:p-4 backdrop-blur-sm">
                        <div className="rounded-2xl overflow-hidden bg-white aspect-[16/9] flex items-center justify-center relative border border-gray-100">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 to-transparent pointer-events-none" />
                            <div className="flex flex-col items-center gap-4 max-w-md text-center">
                                <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                    <MessageSquare className="w-10 h-10 text-emerald-500" />
                                </div>
                                <div>
                                    <div className="h-4 w-32 bg-gray-100 rounded-full mx-auto mb-2" />
                                    <div className="h-3 w-48 bg-gray-50 rounded-full mx-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl -z-10" />
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Zero attrito, massima velocità.</h2>
                        <p className="text-gray-500 max-w-xl mx-auto text-lg">Local è progettato per essere invisibile ma indispensabile durante i tuoi spostamenti.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                                <Zap className="w-6 h-6 fill-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Connessione Istantanea</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Niente account da creare se non vuoi. Ti connetti al WiFi, apri l'app e sei subito nella chat dello spazio in cui ti trovi.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                                <Shield className="w-6 h-6 fill-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Privacy & Passkey</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Usa l'accesso anonimo per una sessione veloce, oppure salva il tuo profilo con le Passkey per una riconsociuta sicura e senza password.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Chat di Luogo</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Parla con gli altri viaggiatori sul tuo treno o con chi sta aspettando il volo insieme a te. Condividi info utili in tempo reale.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust / How it works */}
            <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center md:text-left">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Come funziona l'accesso locale?</h2>
                                <ul className="space-y-4">
                                    {[
                                        "L'app identifica automaticamente lo spazio tramite il WiFi",
                                        "Vieni assegnato alla stanza corretta in pochi millisecondi",
                                        "Puoi scegliere un alias e iniziare subito a scrivere"
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] font-bold">
                                                {i + 1}
                                            </div>
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-40 h-40 md:w-56 md:h-56 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 rotate-3">
                                <Users className="w-20 h-20 md:w-28 md:h-28 text-white" />
                            </div>
                        </div>
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                    </div>
                </div>
            </section>

            {/* CTA Footer Section */}
            <section className="py-20 text-center px-4">
                <h2 className="text-3xl font-bold mb-8">Pronto a iniziare?</h2>
                <button
                    onClick={onConnect}
                    className="px-10 py-5 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-xl transition-all shadow-xl active:scale-95"
                >
                    Entra in Local Chat
                </button>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-12 px-4 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
                            <img src="/local_logo.svg" alt="Local" className="w-4 h-4 brightness-0 invert" />
                        </div>
                        <span className="font-bold text-lg">Local</span>
                    </div>

                    <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
                        <Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-emerald-500 transition-colors">Terms of Use</Link>
                        <a href="mailto:hello@localchat.app" className="hover:text-emerald-500 transition-colors">Contatti</a>
                    </div>

                    <p className="text-gray-400 text-sm">
                        © 2025 Local Team. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
