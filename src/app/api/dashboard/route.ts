import { NextRequest, NextResponse } from "next/server";
import { SensorReadingService } from "@/server/services/sensorReading.service";
import { createAppError } from "@/server/security/AppError";
import { ok, fail } from "@/server/utils/Response";
import { AnyError } from "@/types/errors";
import { DashboardRange } from "@/types/dashboard";

const RANGE_VALUES: DashboardRange[] = ["day", "week", "month"];

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const rangeParam = url.searchParams.get("range");
    const range = (rangeParam as DashboardRange) ?? "day";

    if (!RANGE_VALUES.includes(range)) {
      throw createAppError("BAD_REQUEST", "Invalid range", 400);
    }

    const data = await SensorReadingService.getRange(range);
    return NextResponse.json(ok(data));
  } catch (error: unknown) {
    const err = error as AnyError;
    return NextResponse.json(fail(err), { status: err.status ?? 500 });
  }
}
