# BASE IMAGE
FROM node:22-bullseye-slim AS base
RUN corepack enable && corepack prepare npm@10.9.0 --activate
RUN npm install -g turbo
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# PRUNE STAGE
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune @local/api --docker

# DEV STAGE (Installer)
FROM base AS installer
WORKDIR /app

# First copy only the json files to install dependencies
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci
RUN npm cache clean --force

# Copy full pruned source and build
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# Generate Prisma Client (needed for build)
RUN npx turbo run db:generate --filter=@local/api

# Build
RUN NODE_OPTIONS='--max-old-space-size=1536' npx turbo run build --filter=@local/api

# RUNNER STAGE
FROM base AS runner
WORKDIR /app

# Create non-root user (or use existing node user)
# We use node:nodejs for consistency with standard images
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy essential files
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/package.json .
# We copy the nested dist structure correctly
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=installer --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs /app/packages/database/prisma ./prisma
COPY --from=installer --chown=nestjs:nodejs /app/packages/database/generated/client ./packages/database/generated/client

# Remove internal .env to prevent overrides of Docker env vars
RUN rm -f .env apps/api/.env

# Environment variables
ENV NODE_ENV production
ENV PORT 3001

EXPOSE 3001

# Rename main.js to main.cjs to force CommonJS mode (since package.json has "type": "module")
RUN mv dist/main.js dist/main.cjs

# The path needs to match the bundled build structure: dist/main.cjs
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.cjs"]
