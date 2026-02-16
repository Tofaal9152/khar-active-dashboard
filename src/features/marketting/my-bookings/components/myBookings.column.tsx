import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import DateFormat from "@/utils/DateFormat";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Loader } from "lucide-react";
import { useDownloadInvoice } from "../services/my-booking.service";
import BookingDetailsView from "./BookingDetailsView";

export type BookingRow = {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  selected_slot: string;
  session_type: string;
  date: string;
  dob: string;
  total_price: string;
  discount_amount: string;
  payment_status: string;
  paid_amount: string;
  created_at: string;
  updated_at: string;
  selected_session?: {
    date?: string;
    slot?: {
      title?: string;
      max_capacity?: number;
      enrolled_count?: number;
    };
    location?: string;
  };
};

export const BookingColumns: ColumnDef<BookingRow>[] = [
  {
    accessorKey: "full_name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("full_name")}</div>
    ),
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone_number")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="max-w-55 truncate">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "session_type",
    header: "Session Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("session_type")}</div>
    ),
  },
  {
    accessorKey: "selected_slot",
    header: "Slot",
    cell: ({ row }) => <div>{row.getValue("selected_slot")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "total_price",
    header: "Total",
    cell: ({ row }) => <div>৳{row.getValue("total_price")}</div>,
  },
  {
    accessorKey: "payment_status",
    header: "Payment",
    cell: ({ row }) => {
      const v = String(row.getValue("payment_status") ?? "").toLowerCase();
      const paid = v === "paid";
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            paid
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {paid ? "Paid" : "Unpaid"}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <div>{DateFormat(row.getValue("created_at"))}</div>,
  },

  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const m = useDownloadInvoice();
      return (
        <div className="text-right flex gap-2 justify-end">
          <AppDialog
            size="xl"
            trigger={
              <Button variant="outline" size="sm">
                View Details
              </Button>
            }
            title="Booking Details"
            description={`Details for booking ID: ${row.original.id}`}
          >
            <BookingDetailsView data={row.original} />
          </AppDialog>

          <Button
            onClick={() => m.mutate(row.original.id)}
            disabled={m.isPending}
          >
            {m.isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Downloading
              </>
            ) : (
              <>
                <Download size={16} className="mr-2" />
                Download
              </>
            )}
          </Button>
        </div>
      );
    },
  },
];
