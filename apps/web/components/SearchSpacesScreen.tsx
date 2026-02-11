'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, LocateFixed, MapPin } from "lucide-react";
import dynamic from 'next/dynamic';
import { clientGetTenants } from '@/services/apiService';
import { Geolocation } from '@capacitor/geolocation';

interface Tenant {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    latitude: number;
    longitude: number;
}

interface SearchSpacesScreenProps {
    onBack: () => void;
}

export function SearchSpacesScreen({ onBack }: SearchSpacesScreenProps) {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([43.7228, 10.3956]); // Default to Pisa
    const [isLoading, setIsLoading] = useState(true);
    const [showLocationOverlay, setShowLocationOverlay] = useState(false);
    const [locationChecked, setLocationChecked] = useState(false);

    // Dynamically import the map component
    const DiscoveryMap = useMemo(() => dynamic(
        () => import('./DiscoveryMap'),
        {
            loading: () => <div className="h-full w-full bg-gray-50 animate-pulse" />,
            ssr: false
        }
    ), []);

    useEffect(() => {
        async function loadTenants() {
            try {
                const data = await clientGetTenants();
                setTenants(data.filter((t: any) => t.latitude && t.longitude));
            } catch (error) {
                console.error("Failed to load tenants", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadTenants();
    }, []);

    // Check location permission on mount
    useEffect(() => {
        async function checkLocationPermission() {
            try {
                const status = await Geolocation.checkPermissions();
                if (status.location === 'granted') {
                    // Already granted, get position directly
                    const position = await Geolocation.getCurrentPosition();
                    const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(loc);
                    setMapCenter(loc);
                } else if (status.location !== 'denied') {
                    // Not yet asked — show overlay
                    setShowLocationOverlay(true);
                }
                // If denied, just use default Pisa center
            } catch (error) {
                console.error("Error checking location permission", error);
            } finally {
                setLocationChecked(true);
            }
        }
        checkLocationPermission();
    }, []);

    const handleGrantLocation = async () => {
        try {
            const status = await Geolocation.requestPermissions();
            if (status.location === 'granted') {
                const position = await Geolocation.getCurrentPosition();
                const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
                setUserLocation(loc);
                setMapCenter(loc);
            }
        } catch (error) {
            console.error("Error requesting location", error);
        }
        setShowLocationOverlay(false);
    };

    const requestLocation = async () => {
        try {
            const hasPermission = await Geolocation.checkPermissions();
            if (hasPermission.location !== 'granted') {
                const status = await Geolocation.requestPermissions();
                if (status.location !== 'granted') return;
            }

            const position = await Geolocation.getCurrentPosition();
            const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
            setUserLocation(loc);
            setMapCenter(loc);
        } catch (error) {
            console.error("Error getting location", error);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col bg-white">
            {/* Header - Taller & Borderless */}
            <div className="flex items-center min-h-[5.5rem] px-4 bg-white z-[1000] pt-safe">
                <button
                    onClick={onBack}
                    className="p-3 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-7 h-7 text-gray-900" />
                </button>
                <h2 className="ml-2 text-xl font-black text-gray-900">Cerca spazi local</h2>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative">
                <DiscoveryMap
                    tenants={tenants}
                    userLocation={userLocation}
                    mapCenter={mapCenter}
                />

                {/* Location Permission Overlay */}
                {showLocationOverlay && locationChecked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[3000] p-6">
                        <div className="bg-white rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MapPin className="w-8 h-8 text-primary" />
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 mb-3">
                                Posizione necessaria
                            </h3>

                            <p className="text-gray-500 font-medium text-sm mb-8 leading-relaxed">
                                Per mostrarti gli spazi Local vicino a te, abbiamo bisogno di accedere alla tua posizione.
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={handleGrantLocation}
                                    className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 active:scale-[0.97] transition-all shadow-lg shadow-primary/20"
                                >
                                    <LocateFixed className="w-5 h-5" />
                                    Attiva posizione
                                </button>

                                <button
                                    onClick={() => setShowLocationOverlay(false)}
                                    className="w-full h-12 flex items-center justify-center"
                                >
                                    <span className="text-gray-400 font-bold text-sm">Non ora</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Localization Button */}
                <button
                    onClick={requestLocation}
                    className="absolute bottom-10 right-6 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center z-[1000] border border-gray-100 active:scale-95 transition-transform"
                >
                    <LocateFixed className="w-7 h-7 text-primary" />
                </button>

                {isLoading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-[2000]">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
}
