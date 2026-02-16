import DashboardPageLayout from "@/components/layout/dashboard/DashboardPageLayout";
import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import AddTrainee from "@/features/dashboard/admin/trainee-management/all-trainee/AddTrainee";
import AllTrainee from "@/features/dashboard/admin/trainee-management/all-trainee/AllTrainee";
import { AddTrainerForm } from "@/features/dashboard/admin/trainer-management/all-trainer/AddTrainer";
import { Plus } from "lucide-react";

const page = () => {
  return (
    <DashboardPageLayout
      title="Manage Trainees"
      subtitle="View and manage all trainees in the system."
      action={
        <AppDialog
          title="Add New Trainee"
          size="xl"
          description="Enter the details of the new trainee below. Click save when you're done."
          trigger={
            <Button variant={"destructive"}>
              <Plus size={16} />
              Add Trainee
            </Button>
          }
        >
          <AddTrainee />
        </AppDialog>
      }
    >
      <AllTrainee />
    </DashboardPageLayout>
  );
};

export default page;
