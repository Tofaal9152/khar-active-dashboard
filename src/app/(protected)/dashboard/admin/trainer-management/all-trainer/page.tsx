import DashboardPageLayout from "@/components/layout/dashboard/DashboardPageLayout";
import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import { AddTrainerForm } from "@/features/dashboard/admin/trainer-management/all-trainer/AddTrainer";
import AllTrainer from "@/features/dashboard/admin/trainer-management/all-trainer/AllTrainer";
import { Plus } from "lucide-react";

const page = () => {
  return (
    <DashboardPageLayout
      title="Manage Trainers"
      subtitle="View and manage all trainers in the system."
      action={
        <AppDialog
          title="Add New Trainer"
          size="xl"
          description="Enter the details of the new trainer below. Click save when you're done."
          trigger={
            <Button variant={"destructive"}>
              <Plus size={16} />
              Add Trainer
            </Button>
          }
        >
          <AddTrainerForm />
        </AppDialog>
      }
    >
      <AllTrainer />
    </DashboardPageLayout>
  );
};

export default page;
