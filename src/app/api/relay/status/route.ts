import { NextResponse } from "next/server";

export const relayState = {
  ch1: false,
};

export const schedule = {
  target: false,
  at: 0,
};

export async function GET() {
  // ถ้ามี schedule และถึงเวลาแล้ว → เปลี่ยนค่า
  if (schedule.at > 0 && Date.now() >= schedule.at) {
    relayState.ch1 = schedule.target;
    schedule.at = 0;
  }

  return NextResponse.json({ ...relayState, schedule });
}
