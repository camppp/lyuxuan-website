import { NextResponse } from "next/server";
import { loadRoutes, API_KEY } from "../shared";

export async function GET() {
  if (!API_KEY) return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  try {
    return NextResponse.json(await loadRoutes());
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
