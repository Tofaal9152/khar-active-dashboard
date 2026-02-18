import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import DateFormat from "@/utils/DateFormat";
import BookingDetailsView from "./BookingDetailsView";
import { ColumnDef } from "@tanstack/react-table";

export const BookingColumns: ColumnDef<any>[] = [
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
      return (
        <div className="text-right flex gap-2 justify-end">
          <AppDialog
            size="xl"
            trigger={<Button>View Details</Button>}
            title="Booking Details"
            description={`Details for booking ID: ${row.original.id}`}
          >
            <BookingDetailsView data={row.original} />
          </AppDialog>
        </div>
      );
    },
  },
];
