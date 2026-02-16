"use client";

import DataTable from "@/components/shared/DataTable";
import Pagination from "@/components/shared/Pagination";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

import { useState } from "react";
import { getAllBookings } from "../services/my-booking.service";
import { BookingColumns } from "./myBookings.column";

export default function MyBookingList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: myBookingData,
    isLoading,
    error,
  } = getAllBookings(page, query);

  const list = myBookingData?.results ?? [];

  return (
    <Card >
      <CardContent>
        <DataTable
          data={list}
          columns={BookingColumns}
          loading={isLoading}
          error={error ? String(error) : ""}
        />
      </CardContent>

      <CardFooter>
        <Pagination
          page={page}
          total={myBookingData?.count ?? 0}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
  );
}
