
import DashboardPageLayout from "@/components/layout/dashboard/DashboardPageLayout";
import SessionList from "@/features/dashboard/admin/khar-active/session/components/SessionList";

export default function Page() {
  return (
    <DashboardPageLayout
      title="Manage Sessions"
      subtitle="View and manage all sessions in the system."
    >
      <SessionList />
    </DashboardPageLayout>
  );
}
