# Walkthrough: Admin Dashboard & Chat Enhancements

This walkthrough covers the recent improvements to the "Registered Users" admin page, staff chat availability, and the swipe-to-delete feature for private chats.

## 1. Registered Users Page Enhancements
The "Registered Users" page has been upgraded with a robust Shadcn/UI DataTable.

- **Global Search**: Search users instantly by Name, Email, or Phone Number.
- **Pagination**: Added pagination controls for better navigation through large user lists.
- **Fixed Layout**: Resolved the "double border" effect and implemented internal scrolling for the table, ensuring the page remains responsive and doesn't break layout.
- **Expanded Information**: Added the **Email** column and improved the visibility of **Anonymous** user badges.

## 2. Staff Chat Availability
Users can now always initiate a chat with staff, regardless of their online status.

- **Offline Support**: The blocking "Staff currently unavailable" error has been removed.
- **Improved Role Visibility**: Expanded staff roles to include `OWNER` and `MODERATOR`.
- **Status Indicators Refined**: Red dots correctly indicate offline staff, while the system still allows starting a conversation.

## 3. Swipe-to-Delete for Private Chats
Implemented a native-like swipe gesture to hide private conversations.

- **Haptic Feedback**: Integrated `@capacitor/haptics` for biological feedback on mobile.
- **Persistence**: Hiding a conversation is synced with the backend and persisted in the local SQLite database.

## Verification Results
- [x] **Search**: Tested filtering by name ("anonimo") and phone numbers.
- [x] **Pagination**: Confirmed navigation between pages.
- [x] **Scrolling**: Verified internal table scroll on smaller viewport heights.
- [x] **Build**: Successful build and Capacitor sync completed.
