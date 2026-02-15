---
description: Sync the database schema with the Prisma definition and regenerate the client.
---

// turbo-all
1. Ensure you are in the project root.
2. Run the database push command:
```bash
npx prisma db push --schema packages/database/prisma/schema.prisma
```
3. (Optional) If you need to manually regenerate the client:
```bash
npm run db:generate
```
