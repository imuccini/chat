# Feedback Screen Keyboard Fix

The goal is to ensure that the feedback comment text area is visible and centered on the screen when the keyboard is active on mobile devices.

## Proposed Changes

### [web_app](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web)

#### [MODIFY] [LocalFeedbackOverlay.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/LocalFeedbackOverlay.tsx)

- Implement a focus handler for the `Textarea` component.
- The handler will use `scrollIntoView({ behavior: 'smooth', block: 'center' })` after a short delay (e.g., 300ms) to allow the keyboard to slide up first.
- Ensure the container is scrollable.

## Verification Plan

### Manual Verification
- The user will be asked to test the feedback screen on an iOS device.
- Focus on the text area and confirm it scrolls up to a visible position.
