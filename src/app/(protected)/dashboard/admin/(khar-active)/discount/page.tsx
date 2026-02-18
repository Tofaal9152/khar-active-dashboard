"use client";

import DashboardPageLayout from "@/components/layout/dashboard/DashboardPageLayout";
import DiscountList from "@/features/dashboard/admin/khar-active/discount/components/DiscountList";
export default function CouponsPage() {
  return (
    <DashboardPageLayout
      title="Manage Discounts"
      subtitle="View and manage all discounts in the system."
    >
      <DiscountList />
    </DashboardPageLayout>
  );
}
