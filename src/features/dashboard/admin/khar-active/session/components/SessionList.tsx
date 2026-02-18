"use client";

import DataTable from "@/components/shared/DataTable";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Pagination from "@/components/shared/Pagination";
import { useState } from "react";
import { getAllSession } from "../services/session.service";
import { SessionColumns } from "./session.column";

export default function SessionList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data: sessionData, isLoading, error } = getAllSession(page, query);

  const list = sessionData?.results ?? [];

  return (
    <Card className=" rounded-xl">
      <CardContent className="p-0">
        <div className="p-4">
          <DataTable
            data={list}
            columns={SessionColumns}
            loading={isLoading}
            error={error ? String(error) : ""}
          />
        </div>
      </CardContent>

      <CardFooter className=" px-4 py-3">
        <Pagination
          page={page}
          total={sessionData?.count ?? 0}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
  );
}
