"use client";

import {
  ArrowLeftRight,
  BookOpen,
  Building2,
  ClipboardList,
  Dumbbell,
  MapPin,
  Package,
  Receipt,
  Ticket,
  TrendingUp,
  UserPlus,
  Users,
  ShieldAlert,
  History,
  BarChart3,
  FileText,
  User,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

export type SidebarSubItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type SidebarGroup = {
  title: string;
  icon: LucideIcon;
  isActive?: boolean;
  items: SidebarSubItem[];
};

/* -------------------------------------------------------------------------- */
/*                            1. Analytics Section                            */
/* -------------------------------------------------------------------------- */

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
    //   icon: BarChart3,
    // },
  ],
});

/* -------------------------------------------------------------------------- */
/*                       2. Management & Reporting                            */
/* -------------------------------------------------------------------------- */

export function AdminManagementItems(): { navMain: SidebarGroup[] } {
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
            icon: UserPlus, // 👤 Add trainer
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
      //       icon: User,
      //     },
      //   ],
      // },

      {
        title: "Package Management",
        icon: Package,
        isActive: true,
        items: [
          {
            title: "All Packages",
            url: "/dashboard/admin/package-management/all-packages",
            icon: Receipt, // 📦 Billing related
          },
          {
            title: "Syllabuses",
            url: "/dashboard/admin/package-management/syllabuses",
            icon: BookOpen, // 📘 Course content
          },
        ],
      },

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
      //   icon: BarChart3,
      //   isActive: true,
      //   items: [
      //     {
      //       title: "Session Reports",
      //       url: "/dashboard/admin/reporting-management/session-reports",
      //       icon: FileText,
      //     },
      //   ],
      // },
    ],
  };
}

/* -------------------------------------------------------------------------- */
/*                         3. Khar Academy Section                            */
/* -------------------------------------------------------------------------- */

export function KharActiveMenuItems(): { navMain: SidebarGroup[] } {
  return {
    navMain: [
      {
        title: "Khar Academy",
        icon: Building2, // 🏢 Better academy icon
        isActive: true,
        items: [
          {
            title: "Locations",
            url: "/dashboard/admin/locations",
            icon: MapPin, // 📍 Location
          },
          {
            title: "Trainers",
            url: "/dashboard/admin/trainers",
            icon: Dumbbell, // 🏋️ Fitness related
          },
          {
            title: "Sessions",
            url: "/dashboard/admin/sessions",
            icon: TrendingUp, // 📈 More logical than TrendingDown
          },
          {
            title: "Bookings",
            url: "/dashboard/admin/bookings",
            icon: ArrowLeftRight, // 🔄 Transaction flow
          },
          {
            title: "Discounts",
            url: "/dashboard/admin/discount",
            icon: Ticket, // 🎟 Offer/Discount
          },
        ],
      },
    ],
  };
}
