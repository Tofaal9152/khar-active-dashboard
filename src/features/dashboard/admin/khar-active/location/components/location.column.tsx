"use client";

import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { SessionsDialogContent } from "./SessionsDialogContent";
import { SlotsDialogContent } from "./SlotsDialogContent";
import UpdateLocationForm from "./UpdateLocationForm";

export const locationColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="font-medium ">{row.original.title}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className=" line-clamp-2">{row.original.address}</div>
    ),
  },
  {
    id: "avaiable_sessions",
    header: "Available Sessions",
    cell: ({ row }) => (
      <div className="">{row.original.available_sessions.length || 0}</div>
    ),
  },
  {
    id: "avaiable_slots",
    header: "Available Slots",
    cell: ({ row }) => (
      <div className="">{row.original.available_slots.length || 0}</div>
    ),
  },

  // ✅ AppDialog: Available Sessions
  {
    id: "available_sessions",
    header: () => <div className="text-right">Sessions</div>,
    cell: ({ row }) => {
      const sessions = row.original.available_sessions || [];

      return (
        <div className="text-right">
          <AppDialog
            size="lg"
            trigger={<Button>View Sessions</Button>}
            title="Available Sessions"
            description={`Trainer: ${row.original.title}`}
          >
            <SessionsDialogContent sessions={sessions} />
          </AppDialog>
        </div>
      );
    },
  },

  // ✅ AppDialog: Available Slots
  {
    id: "available_slots",
    header: () => <div className="text-right">Slots</div>,
    cell: ({ row }) => {
      const slots = row.original.available_slots || [];

      return (
        <div className="text-right">
          <AppDialog
            size="lg"
            trigger={<Button>View Slots</Button>}
            title="Available Slots"
            description={`Trainer: ${row.original.title}`}
          >
            <SlotsDialogContent slots={slots} />
          </AppDialog>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <AppDialog
            size="xl"
            trigger={<Button>Edit</Button>}
            title="Edit Location"
            description={`Edit details for location`}
          >
            <UpdateLocationForm data={row.original} />;
          </AppDialog>
        </div>
      );
    },
  },
];
