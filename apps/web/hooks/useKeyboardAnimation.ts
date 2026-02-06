import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';

interface KeyboardAnimationState {
    isVisible: boolean;      // True when keyboard is fully shown (for UI state like padding)
    height: number;          // Current keyboard height for transform
    isAnimating: boolean;
}

/**
 * Hook to handle smooth keyboard animations on iOS/Android.
 * Uses KeyboardResize.None and manual CSS transforms to emulate
 * native iOS keyboard push-up behavior.
 *
 * Key timing:
 * - On OPEN: isVisible becomes true immediately (keyboardWillShow) so padding adjusts early
 * - On CLOSE: isVisible stays true until animation completes (keyboardDidHide) to prevent flicker
 */
export function useKeyboardAnimation() {
    const [state, setState] = useState<KeyboardAnimationState>({
        isVisible: false,
        height: 0,
        isAnimating: false
    });

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;

        // Use None mode - we'll handle the push-up ourselves with transforms
        Keyboard.setResizeMode({ mode: KeyboardResize.None });

        let willShowListener: any;
        let didShowListener: any;
        let willHideListener: any;
        let didHideListener: any;

        const setup = async () => {
            // keyboardWillShow - Start animation AND set visible immediately
            // This ensures padding changes happen in sync with animation start
            willShowListener = await Keyboard.addListener('keyboardWillShow', (info) => {
                setState({
                    isVisible: true,  // Set visible immediately on open
                    height: info.keyboardHeight,
                    isAnimating: true
                });
            });

            // keyboardDidShow - Animation complete
            didShowListener = await Keyboard.addListener('keyboardDidShow', (info) => {
                setState(prev => ({
                    ...prev,
                    height: info.keyboardHeight,
                    isAnimating: false
                }));
            });

            // keyboardWillHide - Start close animation but KEEP isVisible true
            // This prevents padding from changing before animation completes
            willHideListener = await Keyboard.addListener('keyboardWillHide', () => {
                setState(prev => ({
                    ...prev,
                    isAnimating: true,
                    height: 0
                    // NOTE: isVisible stays TRUE here to prevent padding flicker
                }));
            });

            // keyboardDidHide - Animation complete, NOW set isVisible false
            didHideListener = await Keyboard.addListener('keyboardDidHide', () => {
                setState({
                    isVisible: false,  // Only now change visibility
                    height: 0,
                    isAnimating: false
                });
            });
        };

        setup();

        return () => {
            willShowListener?.remove();
            didShowListener?.remove();
            willHideListener?.remove();
            didHideListener?.remove();
        };
    }, []);

    // iOS keyboard animation is ~250ms with ease-out curve
    const contentStyle: React.CSSProperties = Capacitor.isNativePlatform() ? {
        '--keyboard-height': `${state.height}px`,
        transform: `translateY(calc(-1 * max(0px, var(--keyboard-height) - env(safe-area-inset-bottom, 0px))))`,
        transition: 'transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)',
        willChange: state.isAnimating ? 'transform' : 'auto'
    } as React.CSSProperties : {};

    return {
        keyboardHeight: state.height,
        isKeyboardVisible: state.isVisible,
        isAnimating: state.isAnimating,
        contentStyle  // Apply to CONTENT area only, not header
    };
}
