import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import DateFormat from "@/utils/DateFormat";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import TrainerDetailsView from "./TrainerDetailsView";
import TrainerForm from "./TrainerForm";

export const TrainerColumns: ColumnDef<any>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("first_name")}</div>
    ),
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("last_name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="max-w-[220px] truncate">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone_number")}</div>,
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <div className="text-white/80">
        {DateFormat(row.getValue("created_at"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="text-right flex gap-2 justify-end">
        <AppDialog
          size="lg"
          mode="view"
          trigger={
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          }
          title="Trainer Details"
          description={`Trainer ID: ${row.original.id}`}
        >
          <TrainerDetailsView data={row.original} />
        </AppDialog>
        <AppDialog
          trigger={
            <Button className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
              Edit
            </Button>
          }
          title="Edit Trainer"
          description="Fill in the details to edit the trainer."
          size="xl"
        >
          <TrainerForm mode="edit" data={row.original} />
        </AppDialog>
      </div>
    ),
  },
];
