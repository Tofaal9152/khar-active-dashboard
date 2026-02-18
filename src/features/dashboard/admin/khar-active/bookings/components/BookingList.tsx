"use client";

import DataTable from "@/components/shared/DataTable";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Pagination from "@/components/shared/Pagination";
import { useState } from "react";
import { getAllSessionBookings } from "../services/my-booking.service";
import { BookingColumns } from "./Bookings.column";

export default function BookingList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: BookingData,
    isLoading,
    error,
  } = getAllSessionBookings(page, query);

  const list = (BookingData as any)?.results ?? [];

  return (
    <Card className=" rounded-xl">
      <CardContent className="p-0">
        <div className="px-4">
          <DataTable
            data={list}
            columns={BookingColumns}
            loading={isLoading}
            error={error ? String(error) : ""}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Pagination
          page={page}
          total={(BookingData as any)?.count ?? 0}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
  );
}
