import { NextResponse } from "next/server";
import { loadRoutes, API_KEY } from "../shared";

const VEHICLE_CACHE_TTL = 30_000; // 30 seconds — 5,760 upstream requests/day vs 34,560 at 5s
let vehicleCache: object | null = null;
let vehicleCacheTime = 0;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function parseVehicleXML(xml: string) {
  const vehicles: { id: string; route_id: string; lat: number; lon: number }[] = [];
  const blockRe = /<vehicle>([\s\S]*?)<\/vehicle>/g;
  let block;
  while ((block = blockRe.exec(xml)) !== null) {
    const inner = block[1];
    const vid = inner.match(/<vid>([^<]+)<\/vid>/)?.[1];
    const lat = inner.match(/<lat>([^<]+)<\/lat>/)?.[1];
    const lon = inner.match(/<lon>([^<]+)<\/lon>/)?.[1];
    const rt = inner.match(/<rt>([^<]+)<\/rt>/)?.[1];
    if (vid && lat && lon && rt) {
      vehicles.push({ id: vid, route_id: rt, lat: parseFloat(lat), lon: parseFloat(lon) });
    }
  }
  return vehicles;
}

export async function GET() {
  if (!API_KEY) return NextResponse.json({ error: "API key not configured" }, { status: 500 });

  if (vehicleCache && Date.now() - vehicleCacheTime < VEHICLE_CACHE_TTL) {
    return NextResponse.json(vehicleCache, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=10" },
    });
  }

  try {
    const routes = await loadRoutes();
    const batches = chunk(Object.keys(routes), 10);

    const results = await Promise.all(
      batches.map(async (batch) => {
        const res = await fetch(
          `https://metromap.cityofmadison.com/bustime/api/v3/getvehicles?key=${API_KEY}&rt=${batch.join(",")}`
        );
        return parseVehicleXML(await res.text());
      })
    );

    const now = Math.floor(Date.now() / 1000);
    const body = {
      header: { gtfs_realtime_version: "2.0", incrementality: 0, timestamp: now },
      entity: results.flat().map((v) => ({
        id: v.id,
        vehicle: {
          id: v.id,
          trip: { route_id: v.route_id },
          position: { latitude: v.lat, longitude: v.lon },
        },
        timestamp: now,
      })),
    };

    vehicleCache = body;
    vehicleCacheTime = Date.now();

    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=10" },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
