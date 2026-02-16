"use client";

import DataTable from "@/components/shared/DataTable";
import Pagination from "@/components/shared/Pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Shadcn Input
import { Search } from "lucide-react"; // Icon
import { useState } from "react";
import { getAllTrainer } from "../services/trainer.service";
import { TrainerColumns } from "./TrainerColumns";

// --- REALISTIC TRAINER DEMO DATA ---

const AllTrainer = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Search State

  const { data: trainerData, isLoading, error } = getAllTrainer({
    query: {
      page,
      search: searchTerm,
    },
  });
  console.log("trainerData", trainerData?.results);
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div></div>

            {/* --- Search Input --- */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search name, email, style..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1); // Reset to page 1 on search
                }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable
            data={trainerData?.results ?? []} // Safely access results
            columns={TrainerColumns}
            loading={isLoading}
            error={error?.message ?? ""}
          />
        </CardContent>

        <CardFooter className="flex justify-end">
          <Pagination
            page={page}
            onPageChange={setPage}
            total={trainerData?.count ?? 0}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default AllTrainer;
