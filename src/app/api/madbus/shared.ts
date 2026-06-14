export const API_KEY = process.env.MADBUS_API_KEY;

export type RouteEntry = { short_name: string; route_color: string };

let routeCache: Record<string, RouteEntry> | null = null;
let routeCacheTime = 0;
const ROUTE_CACHE_TTL = 5 * 60 * 1000;

export async function loadRoutes(): Promise<Record<string, RouteEntry>> {
  const now = Date.now();
  if (routeCache && now - routeCacheTime < ROUTE_CACHE_TTL) return routeCache;

  const res = await fetch(
    `https://metromap.cityofmadison.com/bustime/api/v3/getroutes?key=${API_KEY}`,
    { next: { revalidate: 300 } }
  );
  const text = await res.text();

  const result: Record<string, RouteEntry> = {};
  const re = /<route>\s*<rt>([^<]+)<\/rt>\s*<rtnm>([^<]+)<\/rtnm>\s*<rtclr>([^<]+)<\/rtclr>/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    result[m[1]] = { short_name: m[1], route_color: m[3] };
  }

  routeCache = result;
  routeCacheTime = now;
  return result;
}
