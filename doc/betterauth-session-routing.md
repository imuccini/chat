# BetterAuth Session Routing — Technical Reference

## Problem: Custom get-session route shadows BetterAuth's handler

**Date:** 2026-02-13
**Affected area:** `/api/auth/get-session`, Google OAuth login, account page session retrieval

### Background

BetterAuth uses a catch-all route (`/api/auth/[...all]/route.ts`) to handle all auth endpoints, including `get-session`. In Next.js App Router, a **specific route file always takes priority over a catch-all**. This means a file at `/api/auth/get-session/route.ts` will shadow the catch-all for that path.

### What went wrong

A custom `/api/auth/get-session/route.ts` was created that queried Prisma directly instead of delegating to `auth.handler()`. It extracted the session token from the cookie like this:

```ts
const sessionTokenMatch = cookieHeader.match(/better-auth\.session_token=([^;]+)/);
const sessionToken = sessionTokenMatch ? decodeURIComponent(sessionTokenMatch[1]) : null;

const dbSession = await prisma.session.findFirst({
    where: { token: sessionToken }
});
```

**The bug:** BetterAuth signs session tokens in cookies using the format `{token}.{hmac_signature}`. The database only stores the `{token}` part. The custom route was querying with the full signed value (token + signature), so the lookup always returned null.

Example:
- Cookie value: `1oO4SlhrgGtE7tbQVuwTyXPjE4w7ZRsu.fljFye0QBLd3SK2I0Jd+NRILVYpngKNYBj5XZlPbNv4=`
- Database stores: `1oO4SlhrgGtE7tbQVuwTyXPjE4w7ZRsu`
- Query tried to match the full string → no result → `{ session: null, user: null }`

### Symptoms

- `useSession()` returned `{ session: null, user: null }` after successful OAuth login
- Google OAuth callback completed successfully (session created in DB, cookies set)
- `GET /api/auth/get-session` returned 200 but with null data
- Console showed `Session: true` (object exists) but `User: false` (user field is null)

### Fix

Deleted the custom `/api/auth/get-session/route.ts`. The catch-all `[...all]/route.ts` now handles the endpoint via `auth.handler(req)`, which correctly verifies signed tokens.

### Key takeaways

1. **Never shadow BetterAuth's catch-all with custom route files** unless you fully replicate its token verification logic (signature stripping, HMAC validation, session expiry checks).
2. **BetterAuth session cookie format is `token.signature`** — if you ever need to extract the token manually, split on `.` and use only the first part.
3. **BetterAuth's `cookieCache` (session_data cookie)** provides client-side session reads without network requests. The `session_token` cookie is httpOnly; the `session_data` cookie is not (configured via `advanced.cookies.sessionDataCookie`). When the cache expires (default 5 min), the client falls back to the API.
4. **Next.js route priority:** specific routes (`/api/auth/get-session/route.ts`) always win over catch-all routes (`/api/auth/[...all]/route.ts`). This can silently break functionality if you're not aware of the shadowing.
