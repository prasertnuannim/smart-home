import { NextResponse } from "next/server";
import { relayState } from "../status/route";

export async function POST(req: Request) {
  const body = await req.json();
  relayState.ch1 = body.ch1;

  return NextResponse.json({ success: true, relayState });
}
