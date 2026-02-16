"use client";

import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  value: { lat: number; lng: number } | null;
  onChange: (v: { lat: number; lng: number }) => void;
  zoom?: number;
};

/* -------------------- Click to Move Marker -------------------- */
function ClickHandler({ onChange }: { onChange: Props["onChange"] }) {
  const map = useMap();

  useMapEvents({
    click(e) {
      const next = { lat: e.latlng.lat, lng: e.latlng.lng };
      onChange(next);
      map.flyTo([next.lat, next.lng], map.getZoom(), { duration: 0.4 });
    },
  });

  return null;
}

/* -------------------- Recenter When Value Changes -------------------- */
function RecenterOnValue({ value }: { value: Props["value"] }) {
  const map = useMap();

  React.useEffect(() => {
    if (!value) return;
    map.setView([value.lat, value.lng], map.getZoom(), { animate: true });
  }, [value, map]);

  return null;
}

/* -------------------- Search Bar -------------------- */
function SearchBar({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const lat = Number(data[0].lat);
        const lng = Number(data[0].lon);
        onSelect(lat, lng);
      }
    } catch (e) {
      console.error("Search failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute left-1/2 top-3 z-[1000] w-[90%] max-w-md -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow dark:border-white/10 dark:bg-[#050c1a]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search place or address..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none dark:text-white dark:placeholder:text-white/40"
        />
        <button
          type="button"
          onClick={search}
          disabled={loading}
          className="rounded-lg bg-cyan-500/15 px-3 py-1 text-xs text-cyan-700 hover:bg-cyan-500/20 dark:text-cyan-200"
        >
          {loading ? "…" : "Search"}
        </button>
      </div>
    </div>
  );
}

/* -------------------- Main Component -------------------- */
export default function LocationPickerMap({
  value,
  onChange,
  zoom = 13,
}: Props) {
  const FALLBACK: [number, number] = [23.8103, 90.4125]; // Dhaka

  const [myCenter, setMyCenter] = React.useState<[number, number] | null>(null);
  const hasInitialized = React.useRef(false);

  /* Auto-detect current location + set marker */
  React.useEffect(() => {
    if (value || hasInitialized.current) return;
    hasInitialized.current = true;

    if (!("geolocation" in navigator)) {
      setMyCenter(FALLBACK);
      onChange({ lat: FALLBACK[0], lng: FALLBACK[1] });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setMyCenter([lat, lng]);
        onChange({ lat, lng });
      },
      () => {
        setMyCenter(FALLBACK);
        onChange({ lat: FALLBACK[0], lng: FALLBACK[1] });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const center: [number, number] = value
    ? [value.lat, value.lng]
    : myCenter ?? FALLBACK;

  return (
    <div className="relative h-100 w-full overflow-hidden rounded-2xl border border-border dark:border-white/10">
      {/* 🔍 Search bar */}
      <SearchBar
        onSelect={(lat, lng) => {
          onChange({ lat, lng });
        }}
      />

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <ClickHandler onChange={onChange} />
        <RecenterOnValue value={value} />

        {value && (
          <Marker position={[value.lat, value.lng]} icon={markerIcon} />
        )}
      </MapContainer>
    </div>
  );
}

// "use client";

// import React from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const markerIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// type Props = {
//   value: { lat: number; lng: number } | null;
//   onChange: (v: { lat: number; lng: number }) => void;
//   zoom?: number;
// };

// function ClickHandler({ onChange }: { onChange: Props["onChange"] }) {
//   useMapEvents({
//     click(e) {
//       onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
//     },
//   });
//   return null;
// }

// export default function LocationPickerMap({
//   value,
//   onChange,
//   zoom = 11,
// }: Props) {
//   // 🇹🇭 default Thailand (Bangkok)
//   const center: [number, number] = value
//     ? [value.lat, value.lng]
//     : [13.7563, 100.5018];

//   return (
//     <div className="h-80 w-full overflow-hidden rounded-2xl border border-white/10">
//       <MapContainer
//         center={center}
//         zoom={zoom}
//         scrollWheelZoom
//         className="h-full w-full"
//       >
//         {/* ✅ English-friendly labels tile */}
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors &copy; CARTO'
//           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//         />

//         <ClickHandler onChange={onChange} />

//         {value && (
//           <Marker position={[value.lat, value.lng]} icon={markerIcon} />
//         )}
//       </MapContainer>
//     </div>
//   );
// }
