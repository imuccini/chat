/*
  Warnings:

  - A unique constraint covering the columns `[vpnIp]` on the table `NasDevice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicIp]` on the table `NasDevice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "NasDevice" ADD COLUMN     "publicIp" TEXT,
ADD COLUMN     "vpnIp" TEXT,
ALTER COLUMN "nasId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NasDevice_vpnIp_key" ON "NasDevice"("vpnIp");

-- CreateIndex
CREATE UNIQUE INDEX "NasDevice_publicIp_key" ON "NasDevice"("publicIp");
