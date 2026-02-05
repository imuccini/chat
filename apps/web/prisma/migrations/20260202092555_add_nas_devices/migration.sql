/*
  Warnings:

  - You are about to drop the column `nas_id` on the `Tenant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Tenant_nas_id_key";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "nas_id";

-- CreateTable
CREATE TABLE "NasDevice" (
    "id" TEXT NOT NULL,
    "nasId" TEXT NOT NULL,
    "name" TEXT,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NasDevice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NasDevice_nasId_key" ON "NasDevice"("nasId");

-- AddForeignKey
ALTER TABLE "NasDevice" ADD CONSTRAINT "NasDevice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
