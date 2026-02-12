# Task: Debug Staff Contact Persistence

The user is still seeing "No staff available" when trying to contact the venue staff.

- [x] Investigation
    - [x] Review `ChatInterface.tsx` logic for `handleContactStaff` <!-- id: 1 -->
    - [x] Review `TenantService.ts` on the backend to verify staff retrieval <!-- id: 2 -->
    - [x] Check why no Admin/Owner is found in the current environment <!-- id: 3 -->
- [x] Implementation
    - [x] Update `findStaff` to prioritize `OWNER` followed by `ADMIN` <!-- id: 4 -->
    - [x] Ensure the "Write to Staff" button opens a chat with the primary admin/owner <!-- id: 5 -->
    - [x] Add a visual placeholder or message in terminal if no admin is found (dev warning) <!-- id: 6 -->

- [x] Verification
    - [x] Verify that clicking the button opens a chat even if staff are offline <!-- id: 7 -->
