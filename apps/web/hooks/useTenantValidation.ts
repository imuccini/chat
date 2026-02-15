'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { getConnectedWifiInfo } from '@/lib/wifi';
import { clientResolveTenant } from '@/services/apiService';

const VALIDATION_INTERVAL_MS = 60_000; // 60 seconds
const COUNTDOWN_SECONDS = 30;

interface TenantValidationResult {
    isOutOfSpace: boolean;
    countdown: number;
}

export function useTenantValidation(tenantSlug: string): TenantValidationResult {
    const [isOutOfSpace, setIsOutOfSpace] = useState(false);
    const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

    const isOutOfSpaceRef = useRef(false);
    const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isValidatingRef = useRef(false);

    const clearCountdown = useCallback(() => {
        if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
        }
    }, []);

    const startCountdown = useCallback(() => {
        clearCountdown();
        setCountdown(COUNTDOWN_SECONDS);
        countdownTimerRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearCountdown();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [clearCountdown]);

    const validate = useCallback(async () => {
        if (isValidatingRef.current) return;
        isValidatingRef.current = true;

        try {
            const wifiInfo = await getConnectedWifiInfo();

            if (!wifiInfo.bssid) {
                if (!isOutOfSpaceRef.current) {
                    isOutOfSpaceRef.current = true;
                    setIsOutOfSpace(true);
                    startCountdown();
                }
                return;
            }

            const resolvedSlug = await clientResolveTenant(undefined, wifiInfo.bssid);

            if (resolvedSlug === tenantSlug) {
                if (isOutOfSpaceRef.current) {
                    isOutOfSpaceRef.current = false;
                    setIsOutOfSpace(false);
                    clearCountdown();
                    setCountdown(COUNTDOWN_SECONDS);
                }
            } else {
                if (!isOutOfSpaceRef.current) {
                    isOutOfSpaceRef.current = true;
                    setIsOutOfSpace(true);
                    startCountdown();
                }
            }
        } catch (err) {
            console.error('[useTenantValidation] Validation error:', err);
        } finally {
            isValidatingRef.current = false;
        }
    }, [tenantSlug, startCountdown, clearCountdown]);

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;

        validate();
        intervalRef.current = setInterval(validate, VALIDATION_INTERVAL_MS);

        let removeListener: (() => void) | null = null;

        (async () => {
            try {
                const { App } = await import('@capacitor/app');
                const listener = await App.addListener('appStateChange', ({ isActive }) => {
                    if (isActive) {
                        // Delay to allow iOS WiFi subsystem to wake up after foregrounding
                        setTimeout(async () => {
                            const wifiInfo = await getConnectedWifiInfo();
                            if (wifiInfo.bssid) {
                                validate();
                            } else {
                                // WiFi not ready yet — retry once after another 2s
                                setTimeout(() => validate(), 2000);
                            }
                        }, 1500);
                    }
                });
                removeListener = () => listener.remove();
            } catch (err) {
                console.error('[useTenantValidation] Failed to add app state listener:', err);
            }
        })();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            clearCountdown();
            if (removeListener) removeListener();
        };
    }, [validate, clearCountdown]);

    if (!Capacitor.isNativePlatform()) {
        return { isOutOfSpace: false, countdown: COUNTDOWN_SECONDS };
    }

    return { isOutOfSpace, countdown };
}
