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
};
