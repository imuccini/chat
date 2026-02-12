-- AlterEnum
ALTER TYPE "TenantRole" ADD VALUE 'OWNER';

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "idToken" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "status" TEXT;

-- CreateTable
CREATE TABLE "HiddenConversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "peerId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "hiddenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HiddenConversation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HiddenConversation_userId_idx" ON "HiddenConversation"("userId");

-- CreateIndex
CREATE INDEX "HiddenConversation_tenantId_idx" ON "HiddenConversation"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "HiddenConversation_userId_peerId_tenantId_key" ON "HiddenConversation"("userId", "peerId", "tenantId");

-- AddForeignKey
ALTER TABLE "HiddenConversation" ADD CONSTRAINT "HiddenConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
