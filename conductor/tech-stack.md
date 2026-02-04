# Tech Stack

## Overview

The "Treno Chat Local" project utilizes a modern and robust technology stack designed for both web and mobile platforms, with a focus on real-time communication and efficient data management.

## Detailed Stack

### Frontend

*   **Framework:** Next.js 16 (React 19)
    *   **Description:** A powerful React framework for building server-rendered and statically generated web applications.
*   **Language:** TypeScript
    *   **Description:** A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and developer experience.
*   **Styling:** Tailwind CSS
    *   **Description:** A utility-first CSS framework for rapidly building custom designs.
*   **UI Components:** Radix UI
    *   **Description:** A collection of unstyled, accessible UI components for building high-quality design systems.
*   **State Management/Data Fetching:** @tanstack/react-query
    *   **Description:** Powerful asynchronous state management for React, simplifying data fetching, caching, and synchronization.

### Backend

*   **Runtime:** Node.js
    *   **Description:** JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Web Framework:** Express.js
    *   **Description:** A fast, unopinionated, minimalist web framework for Node.js, used for handling API routes and server logic.
*   **Real-time Communication:** Socket.IO
    *   **Description:** A library that enables real-time, bidirectional, event-based communication between web clients and servers.

### Database

*   **Database System:** PostgreSQL
    *   **Description:** A powerful, open-source object-relational database system known for its reliability and data integrity.
*   **ORM:** Prisma
    *   **Description:** A next-generation ORM that makes database access easy with an auto-generated and type-safe query builder.

### Mobile

*   **Platform:** Capacitor
    *   **Description:** An open-source native runtime that allows web apps to run natively on iOS, Android, and Electron.
*   **Plugins:**
    *   **Capacitor SQLite:** For local database storage on mobile devices.
    *   **Capacitor Wifi:** For interacting with Wi-Fi functionalities on mobile devices.

### Authentication

*   **Library:** better-auth
    *   **Description:** A library used for handling authentication processes within the application.

### Build & Development Tools

*   **Package Manager:** npm
*   **Containerization (for local DB):** Docker
*   **Language Transpiler:** TypeScript
*   **Linting:** ESLint (implied by `next lint` script)
*   **Module Bundler:** Webpack/Turbopack (integrated with Next.js)
