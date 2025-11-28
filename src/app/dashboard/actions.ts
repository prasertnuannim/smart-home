"use server";

import { prisma } from "@/lib/prisma";

export async function getSensorReadings(deviceId: string, hours = 24) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  return prisma.sensorReading.findMany({
    where: {
      deviceId,
      createdAt: { gte: since },
    },
    orderBy: { createdAt: "asc" },
  });
}
