# Walkthrough: Fix API Runtime Dependency Error

I have resolved the `ERR_MODULE_NOT_FOUND` issue that was causing the `local_api` container to crash. The fix involved switching the API's build process to use Webpack bundling.

## Changes Made

### API Backend
- **Enabled Bundling**: Updated `apps/api/nest-cli.json` to enable Webpack.
- **Custom Resolution**: Added `apps/api/webpack.config.cjs` to handle module resolution for `.js` extensions in the ESM-based monorepo.
- **Dockerfile Update**: Simplified the container's startup command to use the bundled output:
  ```dockerfile
  CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
  ```

## Verification

### Local Build
The API was successfully built locally using the new bundling process:
```bash
npx turbo run build --filter=@local/api
```
The output is a single, self-contained `dist/main.js` file (~4.9MB) which includes all necessary workspace dependencies.

### Next Steps for User
To apply these changes and fix your production environment:
1. Run `docker-compose up -d --build api` on your server.
2. Verify that the container stays up: `docker logs -f local_api`.
