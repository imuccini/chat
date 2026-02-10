---
description: Setup project on a new machine (Align DB and update IP)
---

This workflow aligns the local database with the Prisma schema and updates the server IP address in the environment configuration.

1. Update the server IP address in the root `.env` file to `192.168.1.110`.
// turbo
2. Align the database with the Prisma schema.
```bash
npx prisma db push --schema packages/database/prisma/schema.prisma
```

3. Restart the development servers.
```bash
npm run dev
```
