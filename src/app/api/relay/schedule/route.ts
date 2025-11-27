import { NextResponse } from "next/server";
import { schedule } from "../status/route";

export async function POST(req: Request) {
  const body = await req.json();

  // body = { target: true, delay: 10 } // วินาที
  const ms = body.delay * 1000;

  schedule.target = body.target;
  schedule.at = Date.now() + ms;

  return NextResponse.json({ success: true, schedule });
}
