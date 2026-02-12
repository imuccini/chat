# Plan: Fix API Runtime Dependency Error

The `local_api` container crashes because it cannot resolve the `@local/database` package at runtime. The API's compiled code still references this package, which in turn points to TypeScript source files that are missing from the production runner stage.

## Proposed Changes

### [API Component]

#### [MODIFY] [nest-cli.json](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/api/nest-cli.json)
Enable webpack bundling. This will include the code from `@local/database` and other local packages directly into the API's build output, eliminating the runtime dependency on external workspace source files.

#### [MODIFY] [Dockerfile](file:///Users/ivanmuccini/Apps/Antigravity/chat/chat/apps/api/Dockerfile)
*   Adjust the `CMD` to point to the bundled `dist/main.js` (webpack usually flattens the output).
*   Correct the `CMD` paths to match the standard NestJS build output.

## Verification Plan

### Automated Tests
1.  **Local Build Execution**: Run `npm run build --filter=@local/api` to verify that the bundling process completes without errors.

### Manual Verification
1.  **Docker Deployment**: Run `docker-compose up -d --build api` and verify the container logs.
