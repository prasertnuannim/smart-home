import { SensorReading } from "../domain/sensorReading.entity";

export const SensorReadingMapper = {
  toDomain: (data: any): SensorReading => ({
    id: data.id,
    deviceId: data.deviceId,
    type: data.type,
    co2: data.co2,
    temperature: data.temperature,
    humidity: data.humidity,
    createdAt: data.createdAt,
  }),
};
