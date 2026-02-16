"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Shadcn Tabs
import DataTable from "@/components/shared/DataTable";
import Pagination from "@/components/shared/Pagination";
import { SOSColumns, SOSRequest } from "./SOSColumns";

// --- DEMO DATA (Emergencies) ---
const sosDemoData: SOSRequest[] = [
  {
    id: "1",
    userPhoto: "https://i.pravatar.cc/150?u=1",
    userName: "Tanvir Hasan",
    userType: "TRAINEE",
    phone: "01711223344",
    location: "Boxing Ring A",
    type: "MEDICAL",
    details: "Shoulder dislocation during sparring.",
    status: "PENDING",
    timestamp: "10 mins ago",
  },
  {
    id: "2",
    userPhoto: "https://i.pravatar.cc/150?u=2",
    userName: "Sarah Khan",
    userType: "TRAINER",
    phone: "01999887766",
    location: "Locker Room (Female)",
    type: "SECURITY",
    details: "Reported suspicious behavior.",
    status: "IN_PROGRESS",
    timestamp: "30 mins ago",
  },
  {
    id: "3",
    userPhoto: null,
    userName: "Rahim Uddin",
    userType: "TRAINEE",
    phone: "01888776655",
    location: "Cardio Section",
    type: "MEDICAL",
    details: "Feeling dizzy and chest pain.",
    status: "RESOLVED",
    timestamp: "2 hours ago",
  },
  {
    id: "4",
    userPhoto: "https://i.pravatar.cc/150?u=4",
    userName: "John Doe",
    userType: "TRAINEE",
    phone: "01555443322",
    location: "Weight Area",
    type: "OTHER",
    details: "Equipment failure, cable snapped.",
    status: "RESOLVED",
    timestamp: "Yesterday",
  },
];

const SOSRequests = () => {
  const [filter, setFilter] = useState("ALL"); // ALL, PENDING, RESOLVED
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Stats Calculation
  const pendingCount = sosDemoData.filter((r) => r.status === "PENDING").length;
  const activeCount = sosDemoData.filter(
    (r) => r.status === "IN_PROGRESS",
  ).length;

  // 2. Filter Logic
  const filteredData = sosDemoData.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "PENDING")
      return item.status === "PENDING" || item.status === "IN_PROGRESS";
    if (filter === "RESOLVED") return item.status === "RESOLVED";
    return true;
  });

  // 3. Pagination Logic
  const totalItems = filteredData.length;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 p-4">
      {/* --- Top Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-600 bg-red-50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-red-600 uppercase">
                Pending Alerts
              </p>
              <h3 className="text-2xl font-black text-gray-900">
                {pendingCount}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600 bg-blue-50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase">
                In Progress
              </p>
              <h3 className="text-2xl font-black text-gray-900">
                {activeCount}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600 bg-green-50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-green-600 uppercase">
                Resolved Today
              </p>
              <h3 className="text-2xl font-black text-gray-900">12</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- Main List Card --- */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <CardTitle>SOS / Emergency Requests</CardTitle>
              <CardDescription>
                Monitor and respond to urgent alerts from the gym floor.
              </CardDescription>
            </div>

            {/* Filter Tabs */}
            <Tabs
              defaultValue="ALL"
              onValueChange={setFilter}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ALL">All</TabsTrigger>
                <TabsTrigger
                  value="PENDING"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger value="RESOLVED">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable data={currentData} columns={SOSColumns} loading={false} />

          {currentData.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No requests found in this category.
            </div>
          )}

          {/* Pagination */}
          {totalItems > 0 && (
            <div className="mt-4 flex justify-end">
              <Pagination
                page={page}
                total={totalItems}
                onPageChange={setPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SOSRequests;
