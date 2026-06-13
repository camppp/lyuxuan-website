import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.MADBUS_API_KEY;

export async function GET(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  const route = req.nextUrl.searchParams.get("route") ?? "";
  
  try {
    const url = `https://metromap.cityofmadison.com/bustime/api/v3/getpatterns?key=${API_KEY}&rt=${route}`;
    const res = await fetch(url);
    const text = await res.text();

    const points: [number, number][] = [];
    
    // Extract all points (both stops and waypoints) from patterns
    const pointRegex = /<pt>\s*<seq>([^<]+)<\/seq>\s*<lat>([^<]+)<\/lat>\s*<lon>([^<]+)<\/lon>/g;
    let match;
    while ((match = pointRegex.exec(text)) !== null) {
      const lat = parseFloat(match[2]);
      const lon = parseFloat(match[3]);
      if (!isNaN(lat) && !isNaN(lon)) {
        points.push([lat, lon]);
      }
    }

    // Return in format compatible with Leaflet polyline
    return NextResponse.json({ points });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
