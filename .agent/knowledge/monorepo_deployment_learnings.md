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

### 3. Capacitor Commands
**Context:**
Building mobile apps requires specific command chains to prepare assets and sync.

**Verified Command Chain:**
```bash
cd apps/web && npm run build:cap && npx cap sync && npx cap open ios
```
*Note: `run npx` is incorrect syntax; use `npx` directly or define a script.*
