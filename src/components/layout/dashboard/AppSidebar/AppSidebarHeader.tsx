import SafeImage from "@/components/ui/SafeImage";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebarHeader({
  title,
  subTitle,
  imageSrc,
}: {
  title: string;
  subTitle: string;
  imageSrc?: string | null;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
          >
            <SafeImage
              src={imageSrc}
              width={35}
              height={35}
              alt="logo"
              className="rounded-md p-1 mr-2"
            />
            {/* <div className=" mr-2 rounded-full  flex items-center justify-center overflow-hidden bg-cyan-500 text-sm font-semibold text-slate-950 ">
              D
            </div> */}
            <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer gap-0.5">
              <span className="truncate font-semibold">{title}</span>
              <span className="truncate text-xs flex items-center gap-1">
                {subTitle}
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
