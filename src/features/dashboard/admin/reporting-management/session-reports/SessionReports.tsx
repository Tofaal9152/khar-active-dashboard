"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Download, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- MOCK DATA ---
const sessionReports = [
  {
    id: "SES-001",
    date: "2023-10-25T10:00:00",
    trainer: { name: "Md Tofaal", image: "https://i.pravatar.cc/150?u=1" },
    trainee: { name: "Tanvir Hasan", image: "https://i.pravatar.cc/150?u=3" },
    type: "Boxing",
    duration: "60 min",
    status: "Completed",
    rating: 5,
  },
  {
    id: "SES-002",
    date: "2023-10-25T14:30:00",
    trainer: { name: "Sarah Khan", image: "https://i.pravatar.cc/150?u=2" },
    trainee: { name: "Nusrat Jahan", image: "https://i.pravatar.cc/150?u=4" },
    type: "Muay Thai",
    duration: "90 min",
    status: "Cancelled",
    rating: null,
  },
  {
    id: "SES-003",
    date: "2023-10-24T09:00:00",
    trainer: { name: "John Doe", image: null },
    trainee: { name: "Karimul Islam", image: null },
    type: "MMA",
    duration: "60 min",
    status: "Completed",
    rating: 4,
  },
  {
    id: "SES-004",
    date: "2023-10-24T16:00:00",
    trainer: { name: "Md Tofaal", image: "https://i.pravatar.cc/150?u=1" },
    trainee: { name: "Alex Rahman", image: "https://i.pravatar.cc/150?u=5" },
    type: "Boxing",
    duration: "45 min",
    status: "No Show",
    rating: null,
  },
  {
    id: "SES-005",
    date: "2023-10-23T11:00:00",
    trainer: { name: "Sarah Khan", image: "https://i.pravatar.cc/150?u=2" },
    trainee: { name: "Sadia Afrin", image: "https://i.pravatar.cc/150?u=6" },
    type: "Self Defense",
    duration: "60 min",
    status: "Completed",
    rating: 5,
  },
];

export default function SessionReportsPage() {
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Logic
  const filteredSessions = sessionReports.filter((session) => {
    const matchesSearch = 
      session.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "ALL" || session.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Helper for Status Badge Color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      case "No Show": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Session Reports
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Detailed log of all training sessions and outcomes.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-gray-300">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-gray-700">Filter Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by ID, Trainer, or Trainee..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select defaultValue="ALL" onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="No Show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
               {/* Date Picker Placeholder */}
               <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-300">
                 <CalendarIcon className="mr-2 h-4 w-4" />
                 <span>Pick a date range</span>
               </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-bold text-gray-700">Session ID</TableHead>
                <TableHead className="font-bold text-gray-700">Date & Time</TableHead>
                <TableHead className="font-bold text-gray-700">Trainer</TableHead>
                <TableHead className="font-bold text-gray-700">Trainee</TableHead>
                <TableHead className="font-bold text-gray-700">Activity</TableHead>
                <TableHead className="font-bold text-gray-700">Status</TableHead>
                <TableHead className="font-bold text-gray-700 text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <TableRow key={session.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-xs font-medium text-gray-500">
                      {session.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">
                          {format(new Date(session.date), "MMM dd, yyyy")}
                        </span>
                        <span className="text-xs text-gray-500">
                          {format(new Date(session.date), "hh:mm a")} • {session.duration}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={session.trainer.image || ""} />
                          <AvatarFallback className="text-[10px]">{session.trainer.name.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{session.trainer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={session.trainee.image || ""} />
                          <AvatarFallback className="text-[10px]">{session.trainee.name.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{session.trainee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal text-gray-600">
                        {session.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusBadge(session.status)} border px-2 py-0.5`}>
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {session.rating ? (
                         <span className="flex items-center justify-end gap-1 text-yellow-500 font-bold">
                           ★ {session.rating}.0
                         </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                    No sessions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}