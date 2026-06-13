import { NextResponse } from "next/server";

const API_KEY = process.env.MADBUS_API_KEY;

export const revalidate = 5;

// Convert v3 XML vehicle data to GTFS-Realtime-like format
function parseVehicleXML(xml: string, routeId: string) {
  const vehicles: any[] = [];
  const vehicleRegex = /<vehicle>\s*<vid>([^<]+)<\/vid>\s*<tmstmp>([^<]+)<\/tmstmp>\s*<lat>([^<]+)<\/lat>\s*<lon>([^<]+)<\/lon>/g;
  let match;
  while ((match = vehicleRegex.exec(xml)) !== null) {
    vehicles.push({
      id: match[1],
      timestamp: match[2],
      position: {
        latitude: parseFloat(match[3]),
        longitude: parseFloat(match[4]),
      },
      vehicle: {
        id: match[1],
        route_id: routeId,
      },
    });
  }
  return vehicles;
}

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  try {
    // Get all routes first
    const routesRes = await fetch(
      `https://metromap.cityofmadison.com/bustime/api/v3/getroutes?key=${API_KEY}`
    );
    const routesText = await routesRes.text();
    
    // Extract route IDs
    const routeIds: string[] = [];
    const routeRegex = /<rt>([^<]+)<\/rt>/g;
    let match;
    while ((match = routeRegex.exec(routesText)) !== null) {
      routeIds.push(match[1]);
    }

    // Get vehicles for each route in parallel
    const vehiclePromises = routeIds.map(async (rt) => {
      try {
        const vehiclesRes = await fetch(
          `https://metromap.cityofmadison.com/bustime/api/v3/getvehicles?key=${API_KEY}&rt=${rt}`
        );
        const vehiclesText = await vehiclesRes.text();
        return parseVehicleXML(vehiclesText, rt);
      } catch (e) {
        console.error(`Failed to get vehicles for route ${rt}:`, e);
        return [];
      }
    });

    const vehicleResults = await Promise.all(vehiclePromises);
    const allVehicles = vehicleResults.flat();

    // Return in GTFS-Realtime format
    return NextResponse.json({
      header: {
        gtfs_realtime_version: "2.0",
        incrementality: 0,
        timestamp: Math.floor(Date.now() / 1000),
      },
      entity: allVehicles.map((v) => ({
        id: v.id,
        vehicle: {
          id: v.vehicle.id,
          trip: { route_id: v.vehicle.route_id },
          position: v.position,
        },
        timestamp: Math.floor(Date.now() / 1000),
      })),
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
