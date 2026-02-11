# Walkthrough: Feedback Screen Keyboard Fix

I have implemented a fix for the issue where the mobile keyboard would cover the feedback text area.

## Changes

### [web_app](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web)

#### [LocalFeedbackOverlay.tsx](file:///Users/ivanmuccini/Desktop/chatapp/chat/apps/web/components/LocalFeedbackOverlay.tsx)

- Added a `useRef` to track the `Textarea` element.
- Added a `handleFocus` function that triggers when the user clicks/focuses on the comment area.
- The function uses `scrollIntoView({ behavior: 'smooth', block: 'center' })` after a 300ms delay to ensure the element scrolls to the center of the visible area once the keyboard is up.

## Verification Results

### Manual Verification
- I've implemented the logic and verified the code structure.
- **Action Required**: Please test the feedback screen on your iOS device. Focus on the "Lascia un commento" text area and confirm it scrolls up so you can see what you're writing.
