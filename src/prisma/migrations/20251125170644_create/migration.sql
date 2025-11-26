/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "SensorReading" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "co2" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorReading_pkey" PRIMARY KEY ("id")
);
