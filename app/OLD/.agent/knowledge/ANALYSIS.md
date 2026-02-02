# QuickChat Codebase Analysis

## 1. Project Overview
**QuickChat** (branded as "Treno WiFi" or "QuickChat Anonimo") is a lightweight, anonymous chat application designed to operate in transient network environments like captive portals (e.g., trains, public WiFi). It allows users to join a global chat room using a temporary alias and gender identity without permanent account creation.

## 2. Technical Stack
### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Language:** TypeScript

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Server:** [Express 4.21](https://expressjs.com/)
- **Database:** In-memory (Ephemeral storage using JavaScript objects)

## 3. Architecture & Data Flow
The application follows a **Client-Server** architecture with **Polling** for real-time updates.

- **Communication Pattern:**
  - **Polling:** The client polls the server every 3 seconds for new messages (`GET /api/messages`) and every 10 seconds for presence updates (`POST /api/presence`).
  - **Optimistic Updates:** Messages sent by the user are immediately added to the local UI state before the server request completes.
- **Failover & Resilience:**
  - Checks `document.visibilityState` to pause polling when the app is in the background.
  - Monitors connection health; if fetches fail, switches UI status to "Offline/Local".
- **Storage:**
  - **Server-side:** Data is stored in-memory (`db` object). It persists only as long as the server process is running. Max 100 messages are kept.
  - **Client-side:** User identity (alias/id) is stored in `sessionStorage`. Data is lost if the tab/browser is closed and reopened.

## 4. Key Components

### Backend (`server.js`)
- **API Endpoints:**
  - `GET /api/messages`: Returns the list of messages (capped at 100).
  - `POST /api/messages`: Accepts a new message, timestamps it, logs it to the server console, and adds it to the in-memory array.
  - `POST /api/presence`: Updates the "last seen" timestamp for a user and returns the count of active users within the last 15 seconds.
- **Static Serving:** Serves the built frontend from the `dist` directory.

### Frontend Components

#### `App.tsx` (Entry Point)
- Manages the top-level authentication state (`currentUser`).
- Checks `sessionStorage` on load to restore previous sessions.
- Switches between the `Login` and `ChatRoom` views.

#### `components/Login.tsx`
- A form for users to input an alias and select a gender.
- Generates a random session ID on submission.
- Uses basic validation (trimming whitespace).
- Themed as "Treno WiFi".

#### `components/ChatRoom.tsx` (Main Logic)
- **State Management:** Handles `messages` array, `activeUsersCount`, and `connectionStatus`.
- **Polling Hooks:** `useEffect` sets up `setInterval` timers for fetching data.
- **Scrolling:** Features an auto-scroll to bottom mechanic that respects user manual scrolling (only auto-scrolls if the user was already near the bottom).
- **Sub-components:**
  - **`ChatInput`**: An uncontrolled component using `useRef` to handle input. This prevents keyboard focus glitches often seen on mobile browsers when state updates trigger re-renders.
  - **`GenderIcon`**: Renders SVG icons based on user gender.

## 5. Data Structures (`types.ts`)

### User
```typescript
interface User {
  id: string;      // Random generated string
  alias: string;   // User display name
  gender: 'male' | 'female' | 'other';
  joinedAt: number; // Timestamp
}
```

### Message
```typescript
interface Message {
  id: string;
  senderId: string;
  senderAlias: string;
  senderGender: 'male' | 'female' | 'other';
  text: string;
  timestamp: number;
}
```

## 6. Development & Deployment
- Relies on `vite` for local development (`npm run dev`).
- The production server (`npm start`) runs `node server.js` which serves the API *and* the static frontend files.
- The app is network-agnostic but designed for local networks (logs show local IP addresses).
