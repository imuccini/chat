-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "feedbackEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "menuEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "menuUrl" TEXT,
ADD COLUMN     "staffEnabled" BOOLEAN NOT NULL DEFAULT true;
