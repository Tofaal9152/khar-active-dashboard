import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import DateFormat from "@/utils/DateFormat";
import { ColumnDef } from "@tanstack/react-table";
import AssignTrainer from "./AssignTrainer/AssignTrainer";
import SessionDetailsView from "./SessionDetailsView"; // তোমার details component

export const SessionColumns: ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    id: "slot_title",
    header: "Slot",
    cell: ({ row }) => (
      <div className="font-medium">{row.original?.slot?.title ?? "—"}</div>
    ),
  },
  {
    id: "capacity",
    header: "Capacity",
    cell: ({ row }) => (
      <div className="">{row.original?.slot?.max_capacity ?? "—"}</div>
    ),
  },
  {
    id: "slot_enrolled",
    header: "Enrolled (Slot)",
    cell: ({ row }) => (
      <div className="">{row.original?.slot?.enrolled_count ?? 0}</div>
    ),
  },
  {
    accessorKey: "enrolled_count",
    header: "Enrolled (Session)",
    cell: ({ row }) => <div>{row.getValue("enrolled_count") ?? 0}</div>,
  },
  {
    id: "availability",
    header: "Availability",
    cell: ({ row }) => {
      const max = Number(row.original?.slot?.max_capacity ?? 0);
      const enrolled = Number(row.original?.slot?.enrolled_count ?? 0);
      const full = max > 0 && enrolled >= max;

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            full
              ? "bg-red-500/15 text-red-400 border border-red-500/25"
              : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
          }`}
        >
          {full ? "Full" : "Available"}
        </span>
      );
    },
  },
  {
    id: "trainer",
    header: "Trainer",
    cell: ({ row }) => {
      const t = row.original?.trainer;
      if (!t) return <span className="">Unassigned</span>;

      return (
        <div className="text-white">
          {t?.name ?? t?.full_name ?? t?.email ?? "Assigned"}
        </div>
      );
    },
  },

  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <div className="">{DateFormat(row.getValue("created_at"))}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right flex gap-2 justify-end">
          <AppDialog
            size="xl"
            mode="view"
            trigger={
              <Button variant="default" size="sm">
                View
              </Button>
            }
            title="Session Details"
            description={`Details for session ID: ${row.original.id}`}
          >
            <SessionDetailsView data={row.original} />
          </AppDialog>

          {row.original?.trainer == null && (
            <AppDialog
              size="md"
              mode="edit"
              trigger={
                <Button variant="default" size="sm">
                  Assign Trainer
                </Button>
              }
              title="Assign Trainer"
              description={`Assign a trainer to this session`}
            >
              <AssignTrainer sessionId={row.original.id} onSuccess={() => {}} />
            </AppDialog>
          )}
        </div>
      );
    },
  },
];
