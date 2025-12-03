import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    // ⭐ AUTH KEY
    const key = req.headers.get("x-cron-key");
    if (key !== process.env.CRON_SECRET_KEY) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await prisma.sensorReading.deleteMany({
      where: {
        createdAt: {
          lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    return NextResponse.json({
      ok: true,
      deleted: result.count,
    });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
