"use server";

import { prisma } from "@/lib/prisma";
import { startOfDay, subDays, startOfMonth } from "date-fns";
import { DashboardRange, DashboardReading } from "@/types/dashboard";

export async function getSensorData(range: DashboardRange): Promise<DashboardReading[]> {
  let from: Date;

  if (range === "day") {
    from = startOfDay(new Date());
  } else if (range === "week") {
    from = subDays(new Date(), 7);
  } else {
    from = startOfMonth(new Date());
  }

  const rows = await prisma.sensorReading.findMany({
    where: { createdAt: { gte: from } },
    orderBy: { createdAt: "asc" },
  });

  return rows;
}
