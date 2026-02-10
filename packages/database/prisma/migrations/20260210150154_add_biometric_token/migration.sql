-- CreateTable
CREATE TABLE "BiometricToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "BiometricToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BiometricToken_token_key" ON "BiometricToken"("token");

-- CreateIndex
CREATE INDEX "BiometricToken_userId_idx" ON "BiometricToken"("userId");

-- CreateIndex
CREATE INDEX "BiometricToken_deviceId_idx" ON "BiometricToken"("deviceId");

-- AddForeignKey
ALTER TABLE "BiometricToken" ADD CONSTRAINT "BiometricToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
