"use client";
import { AppSidebarFooter } from "@/components/layout/dashboard/AppSidebar/AppSidebarFooter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppSidebarContent } from "../../../../components/layout/dashboard/AppSidebar/AppSidebarContent";
import { AppSidebarHeader } from "../../../../components/layout/dashboard/AppSidebar/AppSidebarHeader";
import SingleComponentsidebar from "../../../../components/layout/dashboard/AppSidebar/SingleComponentsidebar";
import {
  AdminAnalytics,
  AdminManagementItems,
  KharActiveMenuItems,
} from "./sidebarItem";

export function AdminSidebar({ session }: { session: any }) {
  const kharActiveSidebarItems = KharActiveMenuItems();
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
        <AppSidebarContent
          title={"Khar Academy Management"}
          items={kharActiveSidebarItems.navMain}
        />
      </SidebarContent>

      <SidebarRail />
      <SidebarFooter>
        <AppSidebarFooter user={sessionData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
