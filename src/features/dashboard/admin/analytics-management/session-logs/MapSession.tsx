"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, MapPin, List, Map as MapIcon } from "lucide-react";

// --- 1. SESSION MAP COMPONENT (INTERNAL) ---
const SessionMap = ({ sessions }: { sessions: any[] }) => {
  const [icon, setIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Leaflet Icon Fix
    const customIcon = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIcon(customIcon);
  }, []);

  const centerPosition: [number, number] = [23.7937, 90.4066];

  if (!icon) return null;

  return (
    <MapContainer center={centerPosition} zoom={13} style={{ height: "100%", width: "100%" }} className="z-0 rounded-md">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sessions.map((session) => (
        <Marker key={session.id} position={[session.lat, session.lng]} icon={icon}>
          <Popup>
            <div className="text-center">
              <strong className="text-red-600 block mb-1">{session.trainer}</strong>
              <span className="text-xs text-gray-600">{session.location}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// --- 2. DYNAMIC IMPORT (No SSR for Map) ---
const MapWrapper = dynamic(() => Promise.resolve(SessionMap), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-100">Loading Map...</div>,
});

// --- 3. MOCK DATA ---
const activeSessions = [
  { id: 1, trainer: "Md Tofaal", location: "Bashundhara R/A", lat: 23.8103, lng: 90.4125, time: "12m ago", status: "Active", photo: "https://i.pravatar.cc/150?u=1", type: "Boxing" },
  { id: 2, trainer: "Sarah Khan", location: "Gulshan 2", lat: 23.7937, lng: 90.4066, time: "34m ago", status: "Active", photo: "https://i.pravatar.cc/150?u=2", type: "Yoga" },
  { id: 3, trainer: "John Doe", location: "Banani", lat: 23.794, lng: 90.4043, time: "1h ago", status: "Finished", photo: null, type: "Cardio" },
  { id: 4, trainer: "Karim Uddin", location: "Uttara Sec 4", lat: 23.873, lng: 90.3964, time: "5m ago", status: "Active", photo: null, type: "HIIT" },
  { id: 5, trainer: "Nusrat Jahan", location: "Dhanmondi 32", lat: 23.7511, lng: 90.377, time: "2h ago", status: "Active", photo: "https://i.pravatar.cc/150?u=5", type: "Pilates" },
];

// --- 4. MAIN PAGE COMPONENT ---
export default function MapSessionPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Live Sessions</h2>
          <p className="text-gray-500 text-sm">Monitor trainer locations and status.</p>
        </div>
        <span className="text-sm font-bold bg-white text-red-600 px-4 py-2 rounded-full border shadow-sm flex items-center gap-2">
           <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            {activeSessions.filter((s) => s.status === "Active").length} Active Now
        </span>
      </div>

      {/* --- SHADCN TABS --- */}
      <Tabs defaultValue="map" className="w-full">
        
        {/* Tab List / Switcher */}
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapIcon className="w-4 h-4" /> Map View
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <List className="w-4 h-4" /> List View
            </TabsTrigger>
          </TabsList>
        </div>

        {/* --- MAP CONTENT TAB --- */}
        <TabsContent value="map" className="mt-0">
          <Card className="h-[600px] shadow-sm border p-1">
            <MapWrapper sessions={activeSessions} />
          </Card>
        </TabsContent>

        {/* --- TABLE CONTENT TAB --- */}
        <TabsContent value="table" className="mt-0">
          <Card className="shadow-sm border">
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>A list of all current and recent sessions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trainer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session) => (
                    <TableRow key={session.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={session.photo || ""} />
                            <AvatarFallback className="text-xs">{session.trainer.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          {session.trainer}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-gray-500">
                           <MapPin className="w-3 h-3" /> {session.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-gray-500">
                           <Activity className="w-3 h-3" /> {session.type}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-gray-500">
                           <Clock className="w-3 h-3" /> {session.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={session.status === "Active" ? "default" : "secondary"}
                          className={session.status === "Active" ? "bg-green-600 hover:bg-green-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
                        >
                          {session.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}