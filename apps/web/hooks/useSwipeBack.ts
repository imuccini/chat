import { useState, useRef, useCallback, TouchEvent } from 'react';

interface UseSwipeBackOptions {
    onSwipeBack: () => void;
    edgeWidth?: number;      // How far from left edge to start gesture (default: 30px)
    threshold?: number;      // Min swipe distance to trigger back (default: 100px)
    enabled?: boolean;       // Enable/disable the gesture
}

interface SwipeBackState {
    isDragging: boolean;
    translateX: number;
    opacity: number;
}

export function useSwipeBack({
    onSwipeBack,
    edgeWidth = 30,
    threshold = 100,
    enabled = true
}: UseSwipeBackOptions) {
    const [state, setState] = useState<SwipeBackState>({
        isDragging: false,
        translateX: 0,
        opacity: 1
    });

    const startX = useRef(0);
    const startY = useRef(0);
    const isEdgeSwipe = useRef(false);
    const hasTriggered = useRef(false);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        if (!enabled) return;

        const touch = e.touches[0];
        startX.current = touch.clientX;
        startY.current = touch.clientY;

        // Check if touch started from left edge
        isEdgeSwipe.current = touch.clientX <= edgeWidth;
        hasTriggered.current = false;

        if (isEdgeSwipe.current) {
            setState({ isDragging: true, translateX: 0, opacity: 1 });
        }
    }, [enabled, edgeWidth]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!enabled || !isEdgeSwipe.current || hasTriggered.current) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - startX.current;
        const deltaY = Math.abs(touch.clientY - startY.current);

        // If vertical movement is greater, it's a scroll - cancel swipe
        if (deltaY > 30 && deltaX < 30) {
            isEdgeSwipe.current = false;
            setState({ isDragging: false, translateX: 0, opacity: 1 });
            return;
        }

        // Only allow right-to-left swipe (positive deltaX)
        if (deltaX > 0) {
            // Calculate translateX with some resistance
            const translateX = Math.min(deltaX * 0.8, window.innerWidth);
            const opacity = 1 - (translateX / window.innerWidth) * 0.3;

            setState({ isDragging: true, translateX, opacity });

            // Prevent scroll while swiping
            e.preventDefault();
        }
    }, [enabled]);

    const handleTouchEnd = useCallback(() => {
        if (!enabled || !isEdgeSwipe.current || hasTriggered.current) {
            setState({ isDragging: false, translateX: 0, opacity: 1 });
            return;
        }

        const { translateX } = state;

        if (translateX >= threshold) {
            // Trigger back navigation
            hasTriggered.current = true;
            setState({ isDragging: false, translateX: window.innerWidth, opacity: 0 });

            // Delay callback to allow animation
            setTimeout(() => {
                onSwipeBack();
                setState({ isDragging: false, translateX: 0, opacity: 1 });
            }, 150);
        } else {
            // Spring back to original position
            setState({ isDragging: false, translateX: 0, opacity: 1 });
        }

        isEdgeSwipe.current = false;
    }, [enabled, state, threshold, onSwipeBack]);

    const swipeHandlers = {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
    };

    const swipeStyle = {
        transform: `translateX(${state.translateX}px)`,
        transition: state.isDragging ? 'none' : 'transform 0.2s ease-out, opacity 0.2s ease-out',
        opacity: state.opacity,
    };

    return {
        swipeHandlers,
        swipeStyle,
        isDragging: state.isDragging,
        translateX: state.translateX,
        progress: typeof window !== 'undefined' ? state.translateX / window.innerWidth : 0,
        handlers: swipeHandlers, // Alias for cleaner usage
        style: swipeStyle // Alias for cleaner usage
    };
}
