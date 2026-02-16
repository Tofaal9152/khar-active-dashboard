import DashboardPageLayout from "@/components/layout/dashboard/DashboardPageLayout";
import SOSRequests from "@/features/dashboard/admin/sos-management/sos-history/SOSRequests";

const page = () => {
  return (
    <DashboardPageLayout
      title="SOS History"
      subtitle="View and manage all SOS requests history."
    >
      <SOSRequests />
    </DashboardPageLayout>
  );
};

export default page;
