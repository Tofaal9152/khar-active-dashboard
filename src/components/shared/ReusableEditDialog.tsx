"use client";

import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import React from "react";

interface EditDialogProps {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export default function EditDialog({
  title = "Edit",
  description = "",
  size = "lg",
  children,
}: EditDialogProps) {
  return (
    <AppDialog
      title={title}
      description={description}
      trigger={
        <Button variant="outline" size="sm">
          <EditIcon size={18} />
        </Button>
      }
      size={size}
    >
      {children}
    </AppDialog>
  );
}
