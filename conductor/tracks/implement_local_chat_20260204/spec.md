# Track: Implement user authentication in the local chat app

## Specification

This track outlines the implementation of user authentication in the local chat app, leveraging the existing project infrastructure. The app shoudl keep offering anonymous access to the chat, with the option to register and login with Passkey only, with collection of phone number for eventual recovery. 

### 1. User Authentication

*   **Goal:** Enable users to register, log in, and maintain authenticated sessions.
*   **Details:**
    *   Integrate `better-auth` for user registration and login iwhr Passkey only, with collection of phone number for eventual recovery
    *   Implement secure session management.
    *   Provide clear feedback for authentication success/failure.
    *   Protect routes and functionalities requiring authentication.
