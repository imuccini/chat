'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue in Next.js
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Tenant {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    latitude: number;
    longitude: number;
}

interface DiscoveryMapProps {
    tenants: Tenant[];
    userLocation: [number, number] | null;
    mapCenter: [number, number];
}

function MapController({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
}

export default function DiscoveryMap({ tenants, userLocation, mapCenter }: DiscoveryMapProps) {
    return (
        <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%', zIndex: 1 }}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {tenants.map(tenant => (
                <Marker
                    key={tenant.id}
                    position={[tenant.latitude, tenant.longitude]}
                >
                    <Popup>
                        <div className="p-1">
                            <p className="font-bold text-gray-900 mb-1">{tenant.name}</p>
                            <p className="text-xs text-gray-500 mb-2">@{tenant.slug}</p>
                            <button
                                onClick={() => window.open(`/${tenant.slug}`, '_blank')}
                                className="text-xs font-bold text-primary hover:underline"
                            >
                                Vai alla chat
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {userLocation && (
                <Marker position={userLocation}>
                    <Popup>La tua posizione</Popup>
                </Marker>
            )}

            <MapController center={mapCenter} />
        </MapContainer>
    );
}
