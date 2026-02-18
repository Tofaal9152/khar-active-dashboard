"use client";

import DashboardPageLayout from "@/components/layout/dashboard/DashboardPageLayout";
import { AppDialog } from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import CreateLocationForm from "@/features/dashboard/admin/khar-active/location/components/CreateLocationForm";
import LocationList from "@/features/dashboard/admin/khar-active/location/components/LocationList";
import { Plus } from "lucide-react";

export default function LocationsPage() {
  return (
    <DashboardPageLayout
      title="Manage Locations"
      subtitle="View and manage all locations in the system."
      action={
        <AppDialog
          trigger={
            <Button className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          }
          title="Add New Location"
          description="Fill in the details to add a new location."
          size="xl"
        >
          <CreateLocationForm />
        </AppDialog>
      }
    >
      <LocationList />
    </DashboardPageLayout>
  );
}
