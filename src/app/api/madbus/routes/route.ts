import { NextResponse } from "next/server";

type RouteEntry = { short_name: string; route_color: string };

const API_KEY = process.env.MADBUS_API_KEY;
let cache: Record<string, RouteEntry> | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function loadRoutes(): Promise<Record<string, RouteEntry>> {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_DURATION) return cache;

  const url = `https://metromap.cityofmadison.com/bustime/api/v3/getroutes?key=${API_KEY}`;
  const response = await fetch(url);
  const text = await response.text();

  const result: Record<string, RouteEntry> = {};
  
  // Simple XML parsing for routes
  const routeRegex = /<route>\s*<rt>([^<]+)<\/rt>\s*<rtnm>([^<]+)<\/rtnm>\s*<rtclr>([^<]+)<\/rtclr>/g;
  let match;
  while ((match = routeRegex.exec(text)) !== null) {
    const rt = match[1];
    const short_name = match[1]; // In v3, rt is the short name
    const route_color = match[3];
    result[rt] = { short_name, route_color };
  }

  cache = result;
  cacheTime = now;
  return result;
}

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  try {
    const data = await loadRoutes();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
