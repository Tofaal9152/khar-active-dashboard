"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SafeImage from "@/components/ui/SafeImage";
import LoadGuard from "@/utils/LoadGuard";

import UserMenuPopover from "./UserMenuPopover";
import { cn } from "@/lib/utils";
import { useFetchData } from "@/hooks/useFetchData";

const AVATAR_SIZE = 40;

const UserMenu = ({ session }: { session: any }) => {
  const role = session?.user?.role ?? "GUEST";

  const {
    data: userData,
    isLoading,
    error,
  } = useFetchData<any>({
    url: `/users/${session?.user?.id}/`,
    querykey: ["user", session?.user?.id],
    options: {
      enabled: role === "STUDENT",
    },
  });

  const imageSrc =
    (role === "STUDENT" ? userData?.image : session?.user?.image) ?? undefined;

  return (
    <LoadGuard
      isLoading={role === "STUDENT" ? isLoading : false}
      error={error}
      fallback={
        <div
          className="rounded-full bg-muted animate-pulse"
          style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
          aria-busy
          aria-label="Loading profile"
        />
      }
    >
      <Popover>
        <PopoverTrigger
          className={cn(
            "flex items-center justify-center rounded-full",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          )}
          aria-label="Open user menu"
        >
          <SafeImage
            src={imageSrc}
            alt={session?.user?.name || "User Avatar"}
            className="rounded-full cursor-pointer"
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
          />
        </PopoverTrigger>

        <PopoverContent
          className="w-72 dark:bg-slate-950 p-0"
          align="end"
          sideOffset={8}
        >
          <UserMenuPopover userData={userData} role={role} session={session} />
        </PopoverContent>
      </Popover>
    </LoadGuard>
  );
};

export default UserMenu;
