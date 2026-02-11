'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useAnimation, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

interface SwipeableChatItemProps {
    children: React.ReactNode;
    onDelete: () => void;
    threshold?: number; // 0.5 default
    actionWidth?: number; // 80 default
}

export const SwipeableChatItem: React.FC<SwipeableChatItemProps> = ({
    children,
    onDelete,
    threshold = 0.5,
    actionWidth = 80,
}) => {
    const controls = useAnimation();
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasTriggeredHaptic, setHasTriggeredHaptic] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const triggerHaptic = async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.impact({ style: ImpactStyle.Light });
            } catch (e) {
                console.warn('Haptics not available', e);
            }
        }
    };

    const handleDrag = (_: any, info: PanInfo) => {
        const offset = info.offset.x;
        const containerWidth = containerRef.current?.offsetWidth || 0;

        // If swiping left
        if (offset < 0) {
            const absOffset = Math.abs(offset);

            // Check threshold for haptic
            if (absOffset > containerWidth * threshold) {
                if (!hasTriggeredHaptic) {
                    triggerHaptic();
                    setHasTriggeredHaptic(true);
                }
            } else {
                setHasTriggeredHaptic(false);
            }
        }
    };

    const handleDragEnd = async (_: any, info: PanInfo) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        const containerWidth = containerRef.current?.offsetWidth || 0;

        // If swiped significantly left
        if (offset < -containerWidth * threshold || velocity < -500) {
            setIsDeleting(true);
            await controls.start({ x: -containerWidth, transition: { duration: 0.2 } });
            onDelete();
        }
        // If swiped enough to show the button but not delete
        else if (offset < -20) {
            controls.start({ x: -actionWidth });
        }
        // Snap back
        else {
            controls.start({ x: 0 });
        }

        setHasTriggeredHaptic(false);
    };

    if (isDeleting) {
        return (
            <motion.div
                initial={{ height: 'auto', opacity: 1 }}
                animate={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            />
        );
    }

    return (
        <div ref={containerRef} className="relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 my-1 group">
            {/* Background Underlay (Revealed during swipe) */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-end px-6 z-0"
                style={{ direction: 'rtl' }}
            >
                <div className="flex items-center gap-2 text-white">
                    <Trash2 size={24} />
                    <span className="text-xs font-bold uppercase tracking-wider">Elimina</span>
                </div>
            </div>

            {/* Foreground Content */}
            <motion.div
                drag="x"
                dragConstraints={{ left: -1000, right: 0 }}
                dragElastic={0.1}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                animate={controls}
                className="relative z-10 bg-white dark:bg-gray-900"
            >
                {children}
            </motion.div>

            {/* Manual Delete Tappable Area (only visible when snapped to actionWidth) */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleting(true);
                    onDelete();
                }}
                className="absolute top-0 bottom-0 right-0 w-[80px] bg-transparent z-20 pointer-events-auto"
                aria-label="Delete"
            />
        </div>
    );
};
