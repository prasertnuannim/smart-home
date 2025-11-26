import { NextRequest, NextResponse } from "next/server";
import { SensorReadingService } from "@/server/services/sensorReading.service";
import { RateLimiter } from "@/server/security/RateLimiter";
import { fail, ok } from "@/server/utils/Response";
import { AnyError } from "@/types/errors";

const limiter = new RateLimiter(30, 60); // 30 req/min per device

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    await limiter.check(ip);

    const json = await req.json();
    const result = await SensorReadingService.createReading(json);

    return NextResponse.json(ok(result));
  } catch (error: unknown) {
    const err = error as AnyError;
    return NextResponse.json(fail(err), { status: err.status ?? 500 });
  }
}
