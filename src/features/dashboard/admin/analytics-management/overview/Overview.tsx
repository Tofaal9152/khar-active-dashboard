"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, DollarSign, Users, FileText, Calendar, Plus, FileBarChart } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

// LEAFLET IMPORTS
// Note: You must import 'leaflet/dist/leaflet.css' in your global layout or _app.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- FIX FOR LEAFLET ICONS IN REACT ---
// Leaflet icons often break in React without this fix
const iconFix = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
};

// CHART DATA
const data = [
  { name: "Mon", active: 400, revenue: 2400 },
  { name: "Tue", active: 300, revenue: 1398 },
  { name: "Wed", active: 500, revenue: 9800 },
  { name: "Thu", active: 280, revenue: 3908 },
  { name: "Fri", active: 590, revenue: 4800 },
  { name: "Sat", active: 800, revenue: 6800 },
  { name: "Sun", active: 700, revenue: 5300 },
];

// MAP MARKER DATA (Example: Bangladesh Coordinates)
const mapMarkers = [
  { id: 1, name: "Dhaka HQ", position: [23.8103, 90.4125], status: "Active" },
  { id: 2, name: "Chittagong Hub", position: [22.3569, 91.7832], status: "Active" },
  { id: 3, name: "Sylhet Center", position: [24.8949, 91.8687], status: "Pending" },
  { id: 4, name: "Khulna Branch", position: [22.8456, 89.5403], status: "Active" },
];

export default function Overview() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    iconFix(); // Apply icon fix on mount
  }, []);

  if (!isMounted) {
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50/50 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Analytics Overview
          </h2>
          <p className="text-sm text-gray-500">Welcome back, admin.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white border p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Oct 24, 2024 - Oct 31, 2024</span>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-red-600 hover:text-red-600 hover:shadow-md transition-all group">
          <div className="p-2 bg-gray-100 rounded-full group-hover:bg-red-50">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-bold text-sm">Session Request</span>
        </button>

        <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-red-600 hover:text-red-600 hover:shadow-md transition-all group">
          <div className="p-2 bg-gray-100 rounded-full group-hover:bg-red-50">
            <Plus className="h-5 w-5" />
          </div>
          <span className="font-bold text-sm">Add Trainer</span>
        </button>

        <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-red-600 hover:text-red-600 hover:shadow-md transition-all group">
          <div className="p-2 bg-gray-100 rounded-full group-hover:bg-red-50">
            <FileBarChart className="h-5 w-5" />
          </div>
          <span className="font-bold text-sm">View Reports</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", icon: DollarSign, value: "$45,231.89", sub: "+20.1% from last month" },
          { title: "Active Trainers", icon: Users, value: "+2350", sub: "+180 new this week" },
          { title: "Total Requests", icon: FileText, value: "+12,234", sub: "+19% from last month" },
          { title: "Active Sessions", icon: Activity, value: "+573", sub: "+201 since last hour" },
        ].map((item, i) => (
          <Card key={i} className="border-l-4 border-l-red-600 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-gray-500 uppercase">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{item.value}</div>
              <p className="text-xs text-gray-500 font-medium">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MAIN CONTENT GRID: MAP (Left) & CHART (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* --- MAP SECTION (Left Side - Takes 2 Columns) --- */}
        <Card className="lg:col-span-1 shadow-sm flex flex-col h-[450px]">
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Live Trainer Locations (Leaflet Map)</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0 relative overflow-hidden rounded-b-xl z-0">
             {/* Map Container */}
             <MapContainer 
                center={[23.8103, 90.4125] as [number, number]} 
                zoom={7} 
                scrollWheelZoom={false} 
                className="h-full w-full"
                style={{ height: "100%", width: "100%", zIndex: 0 }}
             >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Rendering Markers */}
                {mapMarkers.map((marker) => (
                  <Marker key={marker.id} position={marker.position as [number, number]}>
                    <Popup>
                      <div className="p-1">
                        <strong className="block text-sm">{marker.name}</strong>
                        <span className="text-xs text-gray-500">{marker.status}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
             </MapContainer>
          </CardContent>
        </Card>

        {/* --- CHART SECTION (Right Side - Takes 1 Column) --- */}
        <Card className="lg:col-span-1 shadow-sm h-[450px] flex flex-col">
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
            <CardDescription>Revenue vs Active</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pl-0 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#000', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#E31C25" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="active" stroke="#000000" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}