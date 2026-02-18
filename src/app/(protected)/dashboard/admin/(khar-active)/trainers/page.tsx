"use client";


import DashboardPageLayout from "@/components/layout/dashboard/DashboardPageLayout";
import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import TrainerForm from "@/features/dashboard/admin/khar-active/trainer/components/TrainerForm";

import TrainerList from "@/features/dashboard/admin/khar-active/trainer/components/TrainerList";
import { Plus } from "lucide-react";

export default function TrainersPage() {
  return (
   
      <DashboardPageLayout
      title="Manage Trainers"
      subtitle="View and manage all trainers in the system."
      action={
        <AppDialog
          trigger={
            <Button className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Add Trainer
            </Button>
          }
          title="Add New Trainer"
          description="Fill in the details to add a new trainer."
          size="xl"
        >
          <TrainerForm/>
        </AppDialog>
      }
    >
      <TrainerList />
    </DashboardPageLayout>
  );
}
