"use client";
import { AppSidebarFooter } from "@/components/layout/dashboard/AppSidebar/AppSidebarFooter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Activity,
  BarChart,
  BookOpen,
  ClipboardList,
  FilePlus2,
  FileText,
  History,
  Landmark,
  Map,
  Package,
  Receipt,
  ShieldAlert,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { AppSidebarContent } from "../../../../components/layout/dashboard/AppSidebar/AppSidebarContent";
import { AppSidebarHeader } from "../../../../components/layout/dashboard/AppSidebar/AppSidebarHeader";
import SingleComponentsidebar from "../../../../components/layout/dashboard/AppSidebar/SingleComponentsidebar";

export function AdminSidebar({ session }: { session: any }) {
  const adminManagementItems = AdminManagementItems();
  const adminAnalytics = AdminAnalytics();

  const SidebarHeaderData = {
    title: "Admin Dashboard",
    subTitle: session?.user?.email || "admin@khar.com",
    imgSrc: session?.user?.avatar || null,
  };
  const sessionData = {
    user: {
      name: session?.user?.name || "Admin User",
      email: session?.user?.email || "admin@khar.com",
      avatar: "", // Avatar image path thakle ekhane dite paro
    },
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <AppSidebarHeader {...SidebarHeaderData} />
      </SidebarHeader>

      <SidebarContent>
        {/* Top Level Analytics (Quick Access) */}
        <SingleComponentsidebar
          title={"Analytics Overview"}
          items={adminAnalytics.item}
        />

        {/* Detailed Management and Reporting Section */}
        <AppSidebarContent
          title={"Management and Reporting"}
          items={adminManagementItems.navMain}
        />
      </SidebarContent>

      <SidebarRail />
      <SidebarFooter>
        <AppSidebarFooter user={sessionData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

// 1. Analytics Quick Links
export const AdminAnalytics = () => ({
  item: [
    {
      title: "Overview",
      url: "/dashboard/admin",
      icon: ClipboardList,
    },
    // {
    //   title: "Session Logs",
    //   url: "/dashboard/admin/analytics-management/session-logs",
    //   icon: Map,
    // },
  ],
});

// 2. Full Management Structure
export function AdminManagementItems() {
  return {
    navMain: [
      {
        title: "Trainer Management",
        icon: Users,
        isActive: true,
        items: [
          {
            title: "All Trainer",
            url: "/dashboard/admin/trainer-management/all-trainer",
            icon: Users,
          },
        ],
      },
      // {
      //   title: "Trainee Management",
      //   icon: Users,
      //   isActive: true,
      //   items: [
      //     {
      //       title: "All Trainee",
      //       url: "/dashboard/admin/trainee-management/all-trainee",
      //       icon: Users,
      //     },
      //   ],
      // },
      // {
      //   title: "Package Management",
      //   icon: Package,
      //   isActive: true,
      //   items: [
      //     {
      //       title: "All Packages",
      //       url: "/dashboard/admin/package-management/all-packages",
      //       icon: Receipt,
      //     },

      //     {
      //       title: "Syllabuses",
      //       url: "/dashboard/admin/package-management/syllabuses",
      //       icon: BookOpen,
      //     },
      //   ],
      // },
      // {
      //   title: "SOS Management",
      //   icon: ShieldAlert,
      //   isActive: true,
      //   items: [
      //     {
      //       title: "SOS History",
      //       url: "/dashboard/admin/sos-management/sos-history",
      //       icon: History,
      //     },
      //   ],
      // },
      // {
      //   title: "Reporting Management",
      //   icon: BarChart,
      //   isActive: true,
      //   items: [
      //     {
      //       title: "Lorem 500",
      //       url: "/dashboard/admin/reporting-management/session-reports",
      //       icon: FileText,
      //     },
      //   ],
      // },
    ],
  };
}
