# BASE IMAGE
FROM node:22-bullseye-slim AS base
RUN npm install -g turbo
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# PRUNE STAGE
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune @local/web --docker

# DEV STAGE (Installer)
FROM base AS installer
WORKDIR /app

# First copy only the json files to install dependencies
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci

# Copy full pruned source and build
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# Generate Prisma Client (needed for build)
RUN npx turbo run db:generate --filter=@local/web

# Build the project
RUN npx turbo run build --filter=@local/web

# RUNNER STAGE
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy essential files
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer /app/apps/web/public ./public
COPY --from=installer /app/apps/web/.next ./.next
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/packages/database/prisma ./prisma

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

# Start standard Next.js
CMD ["npm", "start"]
