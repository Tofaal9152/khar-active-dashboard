import { AppDialog } from "@/components/shared/AppDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import TrainerDetails from "./TrainerDetailsDialog";
import TrainerRegistration from "./edit/trainer-registration/TrainerRegistration";
export const TrainerColumns: ColumnDef<any>[] = [
  {
    accessorKey: "profile_img_url",
    header: "Profile",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue("profile_img_url")} />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
      <div className="truncate max-w-[220px]">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "is_approved",
    header: "Approved",
    cell: ({ row }) => <div>{row.original.is_approved ? "Yes" : "No"}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="text-right flex gap-2 justify-end items-center">
        {/* DETAILS */}
        <AppDialog
          mode="view"
          title="Trainer Details"
          description="All information of this trainer"
          size="xl"
          trigger={
            <Button variant="outline" size="sm">
              Details
            </Button>
          }
        >
          <TrainerDetails data={row.original} />
        </AppDialog>

        {/* EDIT (optional) - if you have a form */}

        <AppDialog
          mode="edit"
          title="Edit Trainer"
          description="Update trainer info"
          size="xl"
        >
          <TrainerRegistration mode="edit" data={row.original} />
        </AppDialog>
      </div>
    ),
  },
];
