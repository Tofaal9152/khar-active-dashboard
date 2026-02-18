import DashboardPageLayout from "@/components/layout/dashboard/DashboardPageLayout";
import BookingList from "@/features/dashboard/admin/khar-active/bookings/components/BookingList";

export default function Page() {
  return (
    <DashboardPageLayout
      title="Manage Bookings"
      subtitle="View and manage all bookings in the system."
    >
      <BookingList />
    </DashboardPageLayout>
  );
}
