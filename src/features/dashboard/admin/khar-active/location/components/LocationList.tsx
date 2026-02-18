"use client";

import DataTable from "@/components/shared/DataTable";
import Pagination from "@/components/shared/Pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { getAllLocation } from "../services/location.service";
import { locationColumns } from "./location.column";


export default function LocationList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = getAllLocation(page, "");

  const list = (data as any)?.results ?? [];

  return (
    <Card className="border rounded-xl">
      <CardContent className="p-0">
        <div className="p-4">
          <DataTable
            data={list}
            columns={locationColumns}
            loading={isLoading}
            error={error ? String(error) : ""}
          />
        </div>
      </CardContent>

      <CardFooter className="border-t px-4 py-3">
        <Pagination
          page={page}
          total={(data as any)?.count ?? 0}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
  );
}
