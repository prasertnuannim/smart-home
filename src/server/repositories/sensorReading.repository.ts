import { Prisma, SensorReading as SensorReadingModel } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const SensorReadingRepository = {
  create: async (
    data: Prisma.SensorReadingCreateInput,
  ): Promise<SensorReadingModel> => {
    return prisma.sensorReading.create({ data });
  },

  latestByDevice: async (
    deviceId: string,
  ): Promise<SensorReadingModel | null> => {
    return prisma.sensorReading.findFirst({
      where: { deviceId },
      orderBy: { createdAt: "desc" },
    });
  },

  findSince: async (
    deviceId: string,
    since: Date,
  ): Promise<SensorReadingModel[]> => {
    return prisma.sensorReading.findMany({
      where: { deviceId, createdAt: { gte: since } },
      orderBy: { createdAt: "asc" },
    });
  },

  findFrom: async (since: Date): Promise<SensorReadingModel[]> => {
    return prisma.sensorReading.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "asc" },
    });
  },
};
