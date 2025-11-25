import { NextRequest, NextResponse } from "next/server";
import { SensorReadingService } from "@/server/services/sensorReading.service";
import { RateLimiter } from "@/server/security/RateLimiter";
import { fail, ok } from "@/server/utils/Response";

const limiter = new RateLimiter(30, 60); // 30 req/min per device

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    await limiter.check(ip);

    const json = await req.json();
    const result = await SensorReadingService.createReading(json);

    return NextResponse.json(ok(result));
  } catch (error: any) {
    return NextResponse.json(fail(error), { status: error.status ?? 500 });
  }
}
