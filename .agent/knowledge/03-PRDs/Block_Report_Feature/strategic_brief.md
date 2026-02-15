# Strategic Brief: User Safety & Moderation (Block/Report)

## 🎯 Functional Objective
Implement mandatory "Block" and "Report" features to ensure user safety and compliance with App Store guidelines, allowing users to prevent contact from specific individuals and signal inappropriate behavior to administrators.

## 🧠 Strategic Intent & UX

### User Flow
1.  **Initiating Action**: User A is in a private chat or viewing the profile of User B.
2.  **Access Point**: User A taps a "More Options" (3-dot) menu in the chat header or profile.
3.  **Selection**: A dropdown/action sheet appears with "Block User" and "Report User".
4.  **Reporting**:
    -   If "Report" is selected, a modal appears asking for a reason (Spam, Harassment, etc.).
    -   Upon submission, the report is sent to the backend with context (last 5-10 messages).
    -   User A sees a "Report Submitted" confirmation toast.
5.  **Blocking**:
    -   If "Block" is selected, a confirmation dialog appears explaining the consequence (they won't be able to message you).
    -   Upon confirmation, User A is returned to the user list, and User B is removed/hidden.
    -   In public rooms, messages from User B are hidden or replaced with "Blocked User" for User A.

### Business Logic
-   **Block Permanence**: Blocks persist across sessions until explicitly unblocked by the blockers.
-   **Discrete Action**: User B is **never** notified that they have been blocked.
-   **Anonymous Handling**: Blocks/Reports must target the underlying `userId` or device identifier, not just the current alias.
-   **Admin Visibility**: Reports must be accessible to admins (via database or dashboard).
-   **Auto-Measure (Optional MVP)**: If a message receives X reports, auto-hide it.

## 🔍 Discovery & Alignment Instructions (FOR THE AI AGENT)

Do not write code until you have performed the following search/analysis:

-   **Pattern Search**:
    -   Search for `ChatHeader` or `Profile` components to identify where to inject the 3-dot menu action.
    -   Check for existing "Dropdown" or "Modal" components to reuse for the Report/Block UI.
    -   Look for `Message` rendering logic to implement the "hide content" feature for blocked users.
-   **Type Alignment**:
    -   Search for the `User` Prisma schema to see if a `blockedUsers` relation exists or needs to be added.
    -   Check if a `Report` model exists; if not, design one that links `reporter`, `accused`, and `context`.
-   **Logic Sync**:
    -   Locate the message fetching service (`sqliteService` or API backend) to ensure blocked messages are filtered out at the query level or filtered in the UI.

## 📋 Acceptance Criteria
-   [ ] **AC 1 (Block - Private)**: Blocking a user prevents them from sending private messages to the blocker and hides the existing chat.
-   [ ] **AC 2 (Block - Public)**: Messages from a blocked user in public rooms are hidden or collapsed for the blocker.
-   [ ] **AC 3 (Report)**: Submitting a report creates a database entry with Reporter ID, Accused ID, Reason, and Message Context.
-   [ ] **AC 4 (Profile UI)**: User profiles and Private Chat headers include a visible way to access Block/Report actions.

## ⚠️ Constraint Guardrails
-   **Proximity Specific**: Ensure "Block" works effectively even if users are on the same local network (i.e., don't rely solely on server-side filtering if peer-to-peer logic is involved).
-   **Privacy**: Do not expose the "Blocked" status to the blocked user.
