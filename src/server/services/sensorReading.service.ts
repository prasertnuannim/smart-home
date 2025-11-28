import { SensorReadingRepository } from "@/server/repositories/sensorReading.repository";
import { createReadingDto } from "@/server/dto/sensorReading.dto";
import { createAppError } from "@/server/security/AppError";
import { SensorReadingMapper } from "@/server/mappers/sensorReading.mapper";
import { SensorReadingPayload } from "@/types/sensorReading";
import { SensorReading } from "@/server/domain/sensorReading.entity";

export const SensorReadingService = {
  createReading: async (body: SensorReadingPayload): Promise<SensorReading> => {
    const parsed = createReadingDto.safeParse(body);
    if (!parsed.success) {
      throw createAppError("VALIDATION_ERROR", "Invalid sensor payload", 400);
    }

    const created = await SensorReadingRepository.create(parsed.data);
    return SensorReadingMapper.toDomain(created);
  },

  getLatest: async (deviceId: string): Promise<SensorReading> => {
    const data = await SensorReadingRepository.latestByDevice(deviceId);
    if (!data) {
      throw createAppError("NOT_FOUND", "No data for device", 404);
    }
    return SensorReadingMapper.toDomain(data);
  },

  getHistory: async (
    deviceId: string,
    hours = 24,
  ): Promise<SensorReading[]> => {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    const data = await SensorReadingRepository.findSince(deviceId, since);
    return data.map(SensorReadingMapper.toDomain);
  },
};
