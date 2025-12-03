"use server";

import { DashboardRange, DashboardReading } from "@/types/dashboard";
import { SensorReadingService } from "@/server/services/sensorReading.service";

export async function getSensorData(range: DashboardRange): Promise<DashboardReading[]> {
  const rows = await SensorReadingService.getRange(range);
  return rows;
}
