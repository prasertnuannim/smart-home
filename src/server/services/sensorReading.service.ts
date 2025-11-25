import { SensorReadingRepository } from "../repositories/sensorReading.repository";
import { createReadingDto } from "../dto/sensorReading.dto";
import { createAppError } from "../security/AppError";
import { SensorReadingMapper } from "../mappers/sensorReading.mapper";

export const SensorReadingService = {
  createReading: async (body: any) => {
    const parsed = createReadingDto.safeParse(body);
    if (!parsed.success) {
      throw createAppError("VALIDATION_ERROR", "Invalid sensor payload", 400);
    }

    const created = await SensorReadingRepository.create(parsed.data);
    return SensorReadingMapper.toDomain(created);
  },

  getLatest: async (deviceId: string) => {
    const data = await SensorReadingRepository.latestByDevice(deviceId);
    if (!data) {
      throw createAppError("NOT_FOUND", "No data for device", 404);
    }
    return SensorReadingMapper.toDomain(data);
  },
};
