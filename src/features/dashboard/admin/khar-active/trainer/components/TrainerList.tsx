"use client";

import DataTable from "@/components/shared/DataTable";
import Pagination from "@/components/shared/Pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { getAllTrainer } from "../services/trainer.service";
import { TrainerColumns } from "./trainer.column";

export default function TrainerList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = getAllTrainer(page, "");

  const list = data?.results ?? [];
  const total = data?.count ?? 0;

  return (
    <Card className="bg-white border border-gray-200 text-gray-900 rounded-xl">
      <CardContent className="p-0">
        <div className="p-4">
          <DataTable
            data={list}
            columns={TrainerColumns}
            loading={isLoading}
            error={error ? String(error) : ""}
          />
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <Pagination
          page={page}
          total={total}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
  );
}
