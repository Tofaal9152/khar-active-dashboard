"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import httpClient from "@/utils/httpClient";
import { useMutationHandler } from "./useMutationHandler";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteButtonProps {
  endPoint: string;
  queryKeys?: any[][]; // allow multiple keys
  confirmMessage?: string;
  confirmDescription?: string;
  successMessage?: string;
  errorMessage?: string;
}

const DeleteAction = ({
  endPoint,
  queryKeys = [],
  successMessage = "Deleted successfully!",
  errorMessage,
  confirmMessage = "Are you absolutely sure?",
  confirmDescription = "This action cannot be undone. This will permanently delete this item and remove the data from our servers.",
}: DeleteButtonProps) => {
  const { mutate, isPending } = useMutationHandler({
    mutationFn: () => httpClient.delete(endPoint),
    queryKeys,
    successMessage,
    errorMessage,
  });

  const handleDelete = () => {
    mutate({});
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isPending} size={"sm"}>
          {isPending ? <Spinner className="w-4 h-4 mr-1" /> : <Trash2Icon />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmMessage}</AlertDialogTitle>
          <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? (
              <>
                <Spinner className="w-4 h-4 mr-2" />
                Deleting...
              </>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAction;

// ------ previously edited code -------
// "use client";

// import { Button } from "@/components/ui/button";
// import { Trash2Icon } from "lucide-react";
// import { Spinner } from "@/components/ui/spinner";
// import httpClient from "@/utils/httpClient";
// import { useMutationHandler } from "./useMutationHandler";

// interface DeleteButtonProps {
//   endPoint: string;
//   queryKeys?: any[][]; // allow multiple keys
//   confirmMessage?: string;
//   successMessage?: string;
//   errorMessage?: string;
// }

// const DeleteAction = ({
//   endPoint,
//   queryKeys = [],
//   successMessage = "Deleted successfully!",
//   errorMessage,
//   confirmMessage = "Are you sure you want to delete this?",
// }: DeleteButtonProps) => {
//   const { mutate, isPending } = useMutationHandler({
//     mutationFn: () => httpClient.delete(endPoint),
//     queryKeys,
//     successMessage,
//     errorMessage,
//   });

//   const handleDelete = () => {
//     if (confirm(confirmMessage)) {
//       mutate({});
//     }
//   };

//   return (
//     <Button variant="destructive" disabled={isPending} onClick={handleDelete} size={"sm"}>
//       {isPending ? <Spinner className="w-4 h-4 mr-1" /> : <Trash2Icon />}
//     </Button>
//   );
// };

// export default DeleteAction;
