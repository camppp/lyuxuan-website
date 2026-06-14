"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Route {
  short_name: string;
  route_color: string;
}

interface Vehicle {
  id: string;
  vehicle: {
    id: string;
    trip: { route_id: string };
    position: { latitude: number; longitude: number };
  };
}

interface VehicleResponse {
  entity: Vehicle[];
}

interface StopFeature {
  attributes: {
    stop_id: string;
    stop_name: string;
    stop_lat: number;
    stop_lon: number;
  };
}

interface PatternResponse {
  points: [number, number][];
  features: StopFeature[];
}

const USER_LATLNG: L.LatLngExpression = [43.071302, -89.407001];
const MAP_CENTER: L.LatLngExpression = [43.075, -89.41];

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MadBusMap() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const vehicleLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const stopsRef = useRef<StopFeature[]>([]);

  const [routes, setRoutes] = useState<Record<string, Route>>({});
  const [selectedRoute, setSelectedRoute] = useState("");
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hashmapRef = useRef<Map<string, string>>(new Map());
  const colormapRef = useRef<Map<string, string>>(new Map());

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: MAP_CENTER,
      zoom: 14,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    vehicleLayerRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);

    L.marker(USER_LATLNG, {
      icon: L.divIcon({
        className: "madbus-icon",
        html: '<svg width="40" height="40"><rect stroke="black" fill="red" x="1" y="1" width="38" height="38"/><text x="20" y="25" font-size="12pt" font-family="arial" font-weight="bold" text-anchor="middle" fill="white">You</text></svg>',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      }),
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Load routes once
  useEffect(() => {
    fetch("/api/madbus/routes")
      .then((r) => r.json())
      .then((data: Record<string, Route>) => {
        setRoutes(data);
        const h = new Map<string, string>();
        const c = new Map<string, string>();
        for (const key in data) {
          h.set(key, data[key].short_name);
          c.set(data[key].short_name, data[key].route_color);
        }
        hashmapRef.current = h;
        colormapRef.current = c;
      })
      .catch(() => setError("Failed to load routes"));
  }, []);

  // Poll vehicles — pauses when tab is hidden
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const load = async () => {
      try {
        const res = await fetch("/api/madbus/vehicles");
        const data: VehicleResponse = await res.json();

        if (!vehicleLayerRef.current || !mapRef.current) return;

        vehicleLayerRef.current.clearLayers();

        data.entity.forEach((v) => {
          const routeLabel = hashmapRef.current.get(v.vehicle.trip.route_id) ?? v.vehicle.trip.route_id;

          L.marker([v.vehicle.position.latitude, v.vehicle.position.longitude], {
            icon: L.divIcon({
              className: "madbus-icon",
              html: `<svg width="30" height="30"><rect stroke="black" fill="white" x="1" y="1" width="28" height="28"/><text x="15" y="21" font-size="13pt" font-family="Arial" font-weight="bold" text-anchor="middle" fill="red">${routeLabel}</text></svg>`,
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            }),
          }).addTo(vehicleLayerRef.current!);
        });

        setVehicleCount(data.entity.length);
        setLastUpdated(new Date().toLocaleTimeString());
        setError(null);
      } catch {
        setError("Failed to load vehicles");
      }
    };

    const start = () => { interval = setInterval(load, 30_000); };
    const stop = () => clearInterval(interval);
    const onVisibilityChange = () => document.hidden ? stop() : (load(), start());

    load();
    start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Display selected route — single upstream call for both shape and stops
  const displayRoute = useCallback(async () => {
    if (!selectedRoute || !routeLayerRef.current) return;

    routeLayerRef.current.clearLayers();
    setLoadingRoutes(true);
    setError(null);

    try {
      const res = await fetch(`/api/madbus/pattern?route=${selectedRoute}`);
      const body = await res.json();

      if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);

      const { points = [], features = [] }: PatternResponse = body;
      stopsRef.current = features;

      const color = colormapRef.current.get(selectedRoute) || "#1e90ff";

      if (points.length > 0) {
        L.polyline(points, { color, weight: 4, opacity: 0.9 }).addTo(routeLayerRef.current);
      }

      features?.forEach((s) => {
        L.circleMarker([s.attributes.stop_lat, s.attributes.stop_lon], {
          radius: 5,
          fillColor: color,
          color: "white",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        })
          .bindPopup(`<strong>${s.attributes.stop_name}</strong><br/>Stop ID: ${s.attributes.stop_id}`)
          .addTo(routeLayerRef.current!);
      });

      const group = new L.FeatureGroup();
      routeLayerRef.current.eachLayer((layer) => group.addLayer(layer));
      if (group.getLayers().length > 0) {
        mapRef.current?.fitBounds(group.getBounds().pad(0.1));
      }
    } catch {
      setError("Failed to display route");
    } finally {
      setLoadingRoutes(false);
    }
  }, [selectedRoute]);

  const clearRoute = useCallback(() => {
    setSelectedRoute("");
    stopsRef.current = [];
    routeLayerRef.current?.clearLayers();
    mapRef.current?.setView(MAP_CENTER, 14);
  }, []);

  // Uses stops cached by displayRoute — no network request
  const showClosest = useCallback(() => {
    const stops = stopsRef.current;
    if (!stops.length || !mapRef.current) return;

    let closest: StopFeature | undefined;
    let minDist = Infinity;

    for (const s of stops) {
      const d = haversine(43.071302, -89.407001, s.attributes.stop_lat, s.attributes.stop_lon);
      if (d < minDist) {
        minDist = d;
        closest = s;
      }
    }

    if (closest) {
      mapRef.current.flyTo([closest.attributes.stop_lat, closest.attributes.stop_lon], 16);
    }
  }, []);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value.toUpperCase())}
          placeholder="Route (e.g. A, 28)"
          className="px-3 py-2 border rounded text-zinc-900 w-32"
          list="route-suggestions"
        />
        <datalist id="route-suggestions">
          {Object.entries(routes).map(([key, r]) => (
            <option key={key} value={r.short_name} />
          ))}
        </datalist>
        <button
          onClick={displayRoute}
          disabled={loadingRoutes || !selectedRoute}
          className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 disabled:opacity-50"
        >
          {loadingRoutes ? "Loading…" : "Display Route"}
        </button>
        <button
          onClick={clearRoute}
          className="px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-700"
        >
          Clear
        </button>
        {selectedRoute && (
          <button
            onClick={showClosest}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Closest Stop
          </button>
        )}
      </div>

      {error && (
        <div className="mb-2 px-3 py-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="mb-2 flex justify-between text-xs text-zinc-500">
        <span>{vehicleCount} vehicles tracked</span>
        {lastUpdated && <span>Updated {lastUpdated}</span>}
      </div>

      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: 600, background: "#888" }}
      />

    </div>
  );
}
