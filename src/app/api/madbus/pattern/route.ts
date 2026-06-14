import { NextRequest, NextResponse } from "next/server";
import { API_KEY } from "../shared";

export async function GET(req: NextRequest) {
  if (!API_KEY) return NextResponse.json({ error: "API key not configured" }, { status: 500 });

  const route = req.nextUrl.searchParams.get("route") ?? "";

  try {
    const res = await fetch(
      `https://metromap.cityofmadison.com/bustime/api/v3/getpatterns?key=${API_KEY}&rt=${route}`,
      { next: { revalidate: 3600 } }
    );
    const text = await res.text();

    if (!res.ok) {
      console.error(`[pattern] upstream ${res.status} for rt=${route}:`, text.slice(0, 300));
      return NextResponse.json({ error: `Upstream error ${res.status}` }, { status: 502 });
    }

    const points: [number, number][] = [];
    const features: object[] = [];

    const ptRe = /<pt>([\s\S]*?)<\/pt>/g;
    let m;
    while ((m = ptRe.exec(text)) !== null) {
      const inner = m[1];
      const lat = parseFloat(inner.match(/<lat>([^<]+)<\/lat>/)?.[1] ?? "");
      const lon = parseFloat(inner.match(/<lon>([^<]+)<\/lon>/)?.[1] ?? "");
      if (isNaN(lat) || isNaN(lon)) continue;

      points.push([lat, lon]);

      if (inner.includes("<typ>S</typ>")) {
        const stpid = inner.match(/<stpid>([^<]+)<\/stpid>/)?.[1];
        const stpnm = inner.match(/<stpnm>([^<]+)<\/stpnm>/)?.[1];
        if (stpid && stpnm) {
          features.push({ attributes: { stop_id: stpid, stop_name: stpnm, stop_lat: lat, stop_lon: lon, Route: route } });
        }
      }
    }

    return NextResponse.json({ points, features }, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300" },
    });
  } catch (e) {
    console.error(`[pattern] rt=${route} error:`, e);
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
