"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Activity,
  Ruler,
  Weight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define Trainee Data Type
export type Trainee = {
  id: string;
  photo: string | null;
  fullName: string;
  email: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  primaryGoal: string;
  joinedAt: string;
  medicalConditions: string[]; // Added this field
};

// Helper for Goal Colors
const getGoalBadgeColor = (goal: string) => {
  switch (goal) {
    case "PRO COMP":
      return "bg-red-600 hover:bg-red-700 text-white border-none";
    case "WEIGHT LOSS":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "SELF DEFENSE":
      return "bg-slate-100 text-slate-800 border-slate-200";
    default:
      return "bg-green-100 text-green-800 border-green-200"; // Fitness
  }
};

export const TraineeColumns: ColumnDef<Trainee>[] = [
  // 1. Profile (Photo, Name, Email)
  {
    accessorKey: "fullName",
    header: "Fighter Profile",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-gray-200">
          <AvatarImage
            src={row.original.photo || ""}
            alt={row.getValue("fullName")}
          />
          <AvatarFallback className="font-bold text-gray-500">
            {row.original.fullName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-bold text-sm text-gray-900">
            {row.getValue("fullName")}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mail className="w-3 h-3" /> {row.original.email}
          </div>
        </div>
      </div>
    ),
  },

  // 2. Age / Gender (Grouped)
  {
    accessorKey: "gender", // We can use gender or age as key
    header: "Age / Gender",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <Activity className="w-4 h-4 text-gray-400" />
        <span className="font-medium">{row.original.age}</span>
        <span className="text-gray-300">|</span>
        <Badge variant="secondary" className="text-xs font-normal text-gray-600">
          {row.original.gender}
        </Badge>
      </div>
    ),
  },

  // 3. Medical Conditions (New Column)
  {
    accessorKey: "medicalConditions",
    header: "Medical Info",
    cell: ({ row }) => {
      const conditions = row.original.medicalConditions;
      return (
        <div className="flex flex-wrap gap-1 max-w-[150px]">
          {conditions && conditions.length > 0 ? (
            conditions.map((cond, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-[10px] px-1 py-0 border-red-200 text-red-600 bg-red-50"
              >
                {cond}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-gray-400 italic flex items-center gap-1">
               Healthy
            </span>
          )}
        </div>
      );
    },
  },

  // 4. Physical Stats
  {
    accessorKey: "height",
    header: "Physique",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Ruler className="w-3 h-3 text-gray-400" />
          <span>{row.original.height} cm</span>
        </div>
        <div className="flex items-center gap-1">
          <Weight className="w-3 h-3 text-gray-400" />
          <span>{row.original.weight} kg</span>
        </div>
      </div>
    ),
  },

  // 5. Primary Goal
  {
    accessorKey: "primaryGoal",
    header: "Goal",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`${getGoalBadgeColor(
          row.getValue("primaryGoal")
        )} px-2 py-0.5 text-[10px] font-bold tracking-wide border`}
      >
        {row.getValue("primaryGoal")}
      </Badge>
    ),
  },

  // 6. Actions
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => console.log("Edit", row.original.id)}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Expel Fighter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];