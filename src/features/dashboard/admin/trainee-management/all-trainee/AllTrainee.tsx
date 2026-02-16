"use client";

import { useState } from "react";
import { Search, X, Filter as FilterIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import your custom components
import DataTable from "@/components/shared/DataTable";
import Pagination from "@/components/shared/Pagination";
import { Trainee, TraineeColumns } from "./TraineeColumns";

// --- DEMO DATA ---
const traineeDemoData: Trainee[] = [
  {
    id: "1",
    photo: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    fullName: "Tanvir Hasan",
    email: "tanvir.h@gmail.com",
    height: 175,
    weight: 78,
    age: 26,
    gender: "Male",
    primaryGoal: "PRO COMP",
    joinedAt: "2023-10-15",
    medicalConditions: [],
  },
  {
    id: "2",
    photo: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    fullName: "Nusrat Jahan",
    email: "nusrat.j@hotmail.com",
    height: 162,
    weight: 58,
    age: 23,
    gender: "Female",
    primaryGoal: "SELF DEFENSE",
    joinedAt: "2023-11-02",
    medicalConditions: ["Asthma"],
  },
  {
    id: "3",
    photo: null,
    fullName: "Karimul Islam",
    email: "karim.fitness@yahoo.com",
    height: 180,
    weight: 95,
    age: 32,
    gender: "Male",
    primaryGoal: "WEIGHT LOSS",
    joinedAt: "2023-09-20",
    medicalConditions: ["Back Pain", "Hypertension"],
  },
  {
    id: "4",
    photo: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    fullName: "Alex Rahman",
    email: "alex.r@gmail.com",
    height: 170,
    weight: 68,
    age: 19,
    gender: "Male",
    primaryGoal: "FITNESS",
    joinedAt: "2024-01-05",
    medicalConditions: [],
  },
  {
    id: "5",
    photo: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    fullName: "Sadia Afrin",
    email: "sadia.fighter@outlook.com",
    height: 165,
    weight: 60,
    age: 25,
    gender: "Female",
    primaryGoal: "PRO COMP",
    joinedAt: "2023-12-12",
    medicalConditions: ["Previous ACL Injury"],
  },
];

const AllTrainee = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // --- FILTER STATES ---
  const [genderFilter, setGenderFilter] = useState("all");
  const [medicalFilter, setMedicalFilter] = useState("all");

  // --- FILTER LOGIC ---
  const filteredData = traineeDemoData.filter((trainee) => {
    // 1. Search Logic
    const matchesSearch =
      trainee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.primaryGoal.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Gender Logic
    const matchesGender =
      genderFilter === "all"
        ? true
        : trainee.gender.toLowerCase() === genderFilter.toLowerCase();

    // 3. Medical Condition Logic
    let matchesMedical = true;
    if (medicalFilter !== "all") {
      if (medicalFilter === "healthy") {
        matchesMedical = trainee.medicalConditions.length === 0;
      } else {
        matchesMedical = trainee.medicalConditions.some((c) =>
          c.toLowerCase().includes(medicalFilter.toLowerCase())
        );
      }
    }

    return matchesSearch && matchesGender && matchesMedical;
  });

  // --- PAGINATION LOGIC ---
  const totalItems = filteredData.length;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Clear Filter Helper
  const clearFilters = () => {
    setSearchTerm("");
    setGenderFilter("all");
    setMedicalFilter("all");
    setPage(1);
  };

  const hasActiveFilters =
    searchTerm || genderFilter !== "all" || medicalFilter !== "all";

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardContent className="pt-6">
          
          {/* --- TOP ACTION ROW (Aligned Right) --- */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
            
            {/* Gender Filter */}
            <div className="w-full md:w-[140px]">
              <Select
                value={genderFilter}
                onValueChange={(val) => {
                  setGenderFilter(val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Medical Filter */}
            <div className="w-full md:w-[180px]">
              <Select
                value={medicalFilter}
                onValueChange={(val) => {
                  setMedicalFilter(val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Medical Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="healthy">Healthy (None)</SelectItem>
                  <SelectItem value="asthma">Asthma</SelectItem>
                  <SelectItem value="injury">Injury History</SelectItem>
                  <SelectItem value="pain">Chronic Pain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search trainees..."
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Clear Button */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFilters}
                className="text-gray-500 hover:text-red-600 hidden md:flex"
                title="Clear Filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Table Stats */}
          <div className="mb-4 text-sm text-gray-500 font-medium">
             Showing {currentData.length} of {totalItems} fighters
          </div>

          {/* Table */}
          <DataTable
            data={currentData}
            columns={TraineeColumns}
            loading={false}
          />

          {/* Empty State */}
          {currentData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <FilterIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No trainees found</h3>
              <p className="text-sm text-gray-500 max-w-sm mt-1">
                 Try adjusting your filters or search terms.
              </p>
              <Button variant="link" onClick={clearFilters} className="mt-2 text-red-600">
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end border-t pt-4">
          {totalItems > 0 && (
            <Pagination page={page} total={totalItems} onPageChange={setPage} />
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AllTrainee;