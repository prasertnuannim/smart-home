import { NextRequest, NextResponse } from "next/server";
import { SensorReadingService } from "@/server/services/sensorReading.service";
import { createAppError } from "@/server/security/AppError";
import { ok, fail } from "@/server/utils/Response";
import { AnyError } from "@/types/errors";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const deviceId = url.searchParams.get("deviceId");
    const hoursParam = url.searchParams.get("hours");
    const parsedHours = hoursParam ? Number(hoursParam) : 24;
    const hours = Number.isFinite(parsedHours) && parsedHours > 0 ? parsedHours : 24;

    if (!deviceId) {
      throw createAppError("BAD_REQUEST", "deviceId is required", 400);
    }

    const data = await SensorReadingService.getHistory(deviceId, hours);
    return NextResponse.json(ok(data));
  } catch (error: unknown) {
    const err = error as AnyError;
    return NextResponse.json(fail(err), { status: err.status ?? 500 });
  }
}
