import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.MADBUS_API_KEY;

export async function GET(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  const route = req.nextUrl.searchParams.get("chosen") ?? "";
  
  try {
    const url = `https://metromap.cityofmadison.com/bustime/api/v3/getpatterns?key=${API_KEY}&rt=${route}`;
    const res = await fetch(url);
    const text = await res.text();

    const stops: { stop_id: string; stop_name: string; stop_lat: number; stop_lon: number; seq: number }[] = [];
    
    // Extract stops from patterns - stops have typ=S with stpid and stpnm
    const stopRegex = /<pt>\s*<seq>([^<]+)<\/seq>\s*<lat>([^<]+)<\/lat>\s*<lon>([^<]+)<\/lon>\s*<typ>S<\/typ>\s*<stpid>([^<]+)<\/stpid>\s*<stpnm>([^<]+)<\/stpnm>/g;
    let match;
    while ((match = stopRegex.exec(text)) !== null) {
      stops.push({
        stop_id: match[4],
        stop_name: match[5],
        stop_lat: parseFloat(match[2]),
        stop_lon: parseFloat(match[3]),
        Route: route,
      });
    }

    return NextResponse.json({ features: stops.map(s => ({ attributes: s })) });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
