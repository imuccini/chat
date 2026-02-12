# Knowledge: Monorepo Deployment & Docker Quirks

## Context
Deploying a NestJS API from a monorepo that depends on local packages (e.g., `@local/database`) can fail at runtime if the deployment artifact is not self-contained. Additionally, legacy `docker-compose` versions can cause obscure errors with modern images.

## Learnings

### 1. NestJS Bundling for Monorepos
**Problem:**
When deploying a NestJS app from a monorepo, standard compilation (`nest build` or `tsc`) preserves imports to local packages. In Docker, if you only copy the app's `dist` folder and `node_modules`, these imports break because the local package source files (often symbolic links in `node_modules`) are missing.

**Solution: Enable Webpack Bundling**
Configure NestJS to use Webpack, which bundles all code (including local dependencies) into a single file (`dist/main.js`).

**Implementation:**
1.  **Update `nest-cli.json`**:
    ```json
    {
      "compilerOptions": {
        "webpack": true,
        "webpackConfigPath": "webpack.config.cjs"
      }
    }
    ```
2.  **Create `webpack.config.cjs`**: Essential for handling `.js` imports in ESM projects.
    ```javascript
    module.exports = function (options) {
      return {
        ...options,
        resolve: {
          ...options.resolve,
          extensionAlias: { '.js': ['.ts', '.js'] },
        },
      };
    };
    ```
3.  **Update Dockerfile CMD**:
    Run the bundled file. *Crucially*, if your package is `type: "module"`, rename the bundle to `.cjs` to force CommonJS mode for internal `require` calls.
    ```dockerfile
    RUN mv dist/main.js dist/main.cjs
    CMD ["node", "dist/main.cjs"]
    ```

### 2. Docker Compose Compatibility
**Problem:**
Legacy `docker-compose` (v1.x, specifically v1.29.2) throws `KeyError: 'ContainerConfig'` when interacting with images built by newer Docker engines.

**Solution:**
Upgrade to Docker Compose v2 (plugin version).
*   **Old command:** `docker-compose up`
*   **New command:** `docker compose up` (no hyphen!)


### 3. Container Permissions & "It Works on My Machine"
**Problem:**
Applications running as non-root (e.g., `USER nestjs`) in Docker cannot write to arbitrary files in the app directory, causing `EACCES: permission denied` for things like `trace.log` or debug files.

**Solution:**
*   Remove ad-hoc `fs.appendFileSync` logging from production code.
*   Use `stdout`/`stderr` (console.log) which Docker captures natively.

### 4. Port Binding & Nginx 502s
**Problem:**
`docker-compose` maps ports (e.g., `3001:3001`), but Nginx returns 502 Bad Gateway.
**Cause:**
The application inside the container might be listening on `localhost` (127.0.0.1) instead of `0.0.0.0`. Docker port mapping *requires* the process to listen on all interfaces (`0.0.0.0`).
**Debugging:**
*   Add explicit logging in `main.ts` before `app.listen()`:
    ```typescript
    console.log(`Attempting to listen on 0.0.0.0:${port}`);
    ```
*   Verify `ENV` variables match between Dockerfile and App (e.g., `PORT` vs `API_PORT`).

### 5. Debugging Silent Failures (Nginx 404s)
**Problem:**
Browser gets 404, but no logs appear in the API container.
**Cause:**
Nginx might be stripping prefixes (e.g., `/api`) while NestJS expects them (due to `setGlobalPrefix`).
**Solution:**
Add a simple request logger middleware in `main.ts` to see *exactly* what path the container receives:
```typescript
app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.url}`);
  next();
});
```

### 6. Capacitor Commands
**Context:**
Building mobile apps requires specific command chains to prepare assets and sync.

**Verified Command Chain:**
```bash
cd apps/web && npm run build:cap && npx cap sync && npx cap open ios
```
*Note: `run npx` is incorrect syntax; use `npx` directly or define a script.*

### 7. Split API Routing (Next.js + NestJS)
**Problem:**
Next.js handles Auth (`/api/auth/*`), but Nginx routes *all* `/api/*` to NestJS (3001), causing 404s for auth endpoints.
**Solution:**
Configure Nginx with specific blocks to split traffic:
```nginx
# specific auth routes -> Next.js (3000)
location /api/auth/ {
    proxy_pass http://localhost:3000;
}

# catch-all api routes -> NestJS (3001)
location /api/ {
    proxy_pass http://localhost:3001;
}
```

### 8. Socket.IO vs NestJS IoAdapter
**Problem:**
WebSockets fail to connect through Nginx/Docker even with correct port mapping.
**Cause:**
Using a standalone `new Server(port)` in `main.ts` creates a *detached* WebSocket server that doesn't share the HTTP server's port or context. Nginx upgrades the HTTP request, passes it to NestJS, but the detached WS server never sees it.
**Solution:**
Always implement a custom class extending `IoAdapter` and call `super.createIOServer(port, options)`. This ensures Socket.IO attaches to the underlying NestJS HTTP server instance.
```typescript
class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(createAdapter(pubClient, subClient));
    return server;
  }
}
app.useWebSocketAdapter(new RedisIoAdapter(app));
```
