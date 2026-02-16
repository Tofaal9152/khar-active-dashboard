import DashboardShell from "@/components/layout/dashboard/DashboardShell";
import { AdminSidebar } from "@/features/dashboard/admin/sidebar/AdminSidebar";
import { getSession } from "@/utils/session";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <DashboardShell sidebar={<AdminSidebar session={session} />}>
      {children}
    </DashboardShell>
  );
}
