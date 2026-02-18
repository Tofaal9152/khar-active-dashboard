"use client";

import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type SidebarItem = {
  title: string;
  url: string;
  icon: any;
};

interface SidebarMenuLinksProps {
  items: SidebarItem[];
}

export default function SidebarMenuLinks({ items }: SidebarMenuLinksProps) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url} className="flex items-center gap-3 px-3 py-2">
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
