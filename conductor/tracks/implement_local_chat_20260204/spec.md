# Track: Implement local chat functionality with user authentication and real-time messaging

## Specification

This track outlines the implementation of core local chat functionality, including user authentication and real-time messaging, leveraging the existing project infrastructure.

### 1. User Authentication

*   **Goal:** Enable users to register, log in, and maintain authenticated sessions.
*   **Details:**
    *   Integrate `better-auth` for user registration and login.
    *   Implement secure session management.
    *   Provide clear feedback for authentication success/failure.
    *   Protect routes and functionalities requiring authentication.

### 2. Real-time Messaging

*   **Goal:** Allow authenticated users to send and receive messages in real-time within local chat channels.
*   **Details:**
    *   Utilize Socket.IO for establishing and maintaining real-time connections.
    *   Define Socket.IO events for sending and receiving messages.
    *   Integrate with the backend (Node.js/Express.js) to handle message persistence via Prisma and PostgreSQL.
    *   Implement message display in the frontend (Next.js/React).
    *   Consider message timestamps and sender identification.

### 3. Local Chat Channels

*   **Goal:** Enable users to join and participate in chat channels based on their physical proximity or designated "local" areas (e.g., train, beach, pub, hotel, event).
*   **Details:**
    *   Define a mechanism for users to identify and join relevant local channels. This might involve:
        *   Proximity-based detection (if feasible with Capacitor Wifi or other location services, subject to user permissions).
        *   Manual selection of predefined local channels.
    *   Ensure messages sent in a channel are only visible to members of that channel.

### 4. User Interface (UI) and Experience (UX)

*   **Goal:** Provide an intuitive and functional user interface for chat interactions.
*   **Details:**
    *   Design and implement chat interfaces using Next.js, React, Tailwind CSS, and Radix UI components (e.g., `components/ChatInterface.tsx`, `components/ChatList.tsx`).
    *   Display user lists within channels (`components/UserList.tsx`).
    *   Ensure responsive design for both web and mobile platforms.
    *   Provide input fields for messages and a display area for chat history.
    *   Integrate Capacitor Haptics and Status Bar as per `capacitor.config.ts` for mobile UX.

### 5. Mobile Integration (Capacitor)

*   **Goal:** Ensure seamless functionality on mobile devices via Capacitor.
*   **Details:**
    *   Verify Capacitor build process.
    *   Test authentication and real-time messaging on Android and iOS.
    *   Utilize Capacitor SQLite for potential local caching (if deemed necessary for offline capabilities, though not explicitly required for initial real-time chat).

### 6. Admin Functionality (Initial consideration)

*   **Goal:** Ensure existing admin authentication and tenant management are not impacted and can potentially be extended for local chat moderation.
*   **Details:**
    *   Confirm `app/admin/login/page.tsx` and related admin components are functional.
    *   Consider future integration points for admin oversight of local chat channels (out of scope for initial track, but good to keep in mind).

### Success Metrics

*   Users can successfully register and log in.
*   Authenticated users can send and receive real-time messages in a designated chat channel.
*   Chat messages are persisted in the PostgreSQL database.
*   The chat interface is functional and responsive on both web and mobile.
