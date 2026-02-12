# Walkthrough - Enable Offline Staff Messaging

I have updated the application to allow users to contact staff members even when they are offline, and added a specific "Staff" section to the user list.

## Changes

### 1. Staff Section in User List
I added a new "Staff del Locale" section to the `UserList` component.
- Staff members are fetched from the API and always displayed at the top of the list.
- Staff members show their status (Online/Offline).

### 2. Offline Messaging Support
I updated `ChatInterface` to:
- Allow opening a chat with any staff member, regardless of their online status.
- Show a specific alert when messaging an offline staff member:
  > "Lo staff non è online. Lascia un messaggio e ti risponderemo appena possibile."

### 3. Code Changes

#### `apps/web/components/ChatInterface.tsx`
- Added `useQuery` to fetch tenant staff.
- Passed `staffMembers` to `UserList`.
- Updated the offline alert logic to distinguish between staff and regular users.

#### `apps/web/components/UserList.tsx`
- Updated to accept a `staff` prop.
- Implemented logic to filter and display staff in a dedicated section.
- Added visual indicators for staff status.

## Verification Results

### Automated Tests
- N/A (UI/Logic changes verified via code review)

### Manual Verification Steps
1.  **Open User List**: Navigate to the "Utenti" tab.
2.  **Verify Staff Section**: Check that "Staff del Locale" appears at the top.
3.  **Check Status**: Verify that staff members show correct online/offline status.
4.  **Start Chat**: Click on an offline staff member.
5.  **Verify Alert**: Ensure the chat opens and displays the message: "Lo staff non è online. Lascia un messaggio e ti risponderemo appena possibile."
6.  **Send Message**: Try sending a message to the offline staff member. It should be sent successfully and stored.
