PRD: Multi-Room System & Broadcast Functionality for "Local"
1. Project Overview
The objective is to evolve the "Local" application from a single-room chat per location to a Multi-Room architecture. Every Tenant (physical space/beach) must automatically support organized communication channels, separating official announcements from general user chatter.

2. Data Model Specifications (Prisma)
The agent must implement the following schema changes while strictly adhering to the existing naming convention (Tenant, TenantMember).

Code snippet
enum RoomType {
  ANNOUNCEMENT // Read-only for standard users, Write for Admin/Moderator
  GENERAL      // Read/Write for all verified users
}

model Room {
  id        String   @id @default(cuid())
  name      String
  type      RoomType @default(GENERAL)
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  messages  Message[]
  createdAt DateTime @default(now())
}

// Update Message model to link to Room instead of Tenant
model Message {
  id        String   @id @default(cuid())
  text      String
  userId    String
  roomId    String
  room      Room     @relation(fields: [roomId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
3. Core Functional Requirements
A. Automatic Room Seeding
When a new Tenant is created, the system must automatically generate two default rooms:

"Announcements": (Type: ANNOUNCEMENT). Used for official broadcasts.

"[Tenant Name]": (Type: GENERAL). The main community chat.

B. The Broadcast Feature (Manager Tools)
Permission Check: Only users with canModerate or ADMIN/MODERATOR roles within the specific TenantMember relation can send messages in ANNOUNCEMENT rooms.

Public View: For standard users, the input field in ANNOUNCEMENT rooms must be disabled and replaced with a label: "Only staff can post here."

4. UI/UX & Navigation Flow
Tab 1: Room List
The first tab of the BottomNav should no longer open a chat directly. It must display a List of Rooms associated with the current Tenant.

Each list item shows the room name and a type icon (e.g., a Megaphone for Announcements, a Bubble for General).

Entrance Logic: Clicking a room navigates the user to the ChatDetail screen.

ChatDetail Screen
Header: Displays the Room Name (centered) and a "Back" arrow (left) to return to the Room List.

Body: Scrollable message list.

Footer: Input container for sending messages.

Layout Constraint: The BottomNav MUST be hidden on this screen to provide a focused, full-screen chat experience.

5. Security: The "Double-Lock" Preservation
The AI agent must ensure that the transition to multi-room does not bypass the physical presence verification:

Room List Access: Only visible if the user's current BSSID/IP matches the Tenant identifiers.

Message Integrity: The authorizeTenant middleware must verify that any requested roomId actually belongs to the Tenant the user is physically connected to.

6. Technical Instructions for the AI Agent
"Implement the Multi-Room system as per the PRD:

Update the Prisma schema to include the Room entity and re-link Message accordingly.

Implement a post-creation hook for Tenant to seed the two default rooms.

Refactor the main tab to show a list of rooms instead of a single chat.

Create the ChatDetail view: ensure the BottomNav is hidden and implement the back-arrow navigation.

STRICT NAMING: Use Tenant and TenantMember throughout. Do not use 'Venue'.

SECURITY: Every API call for room messages must be wrapped in the authorizeTenant middleware to enforce the BSSID/IP 'Double-Lock' check."