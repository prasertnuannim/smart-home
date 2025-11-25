import { prisma } from "../../lib/prisma";

export const SensorReadingRepository = {
  create: async (data: any) => {
    return prisma.sensorReading.create({ data });
  },

  latestByDevice: async (deviceId: string) => {
    return prisma.sensorReading.findFirst({
      where: { deviceId },
      orderBy: { createdAt: "desc" },
    });
  },
};
