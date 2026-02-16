"use client";

import axios from "axios";
import { toast } from "sonner";

export default async function ensureSession(resData: any) {
  const user = resData?.data?.customer?.user;
  const tokens = resData?.data?.customer?.tokens;

  if (!user?.id || !tokens?.access || !tokens?.refresh) {
    toast.error("Missing user/tokens from booking response");
    return false;
  }

  const sessionRes = await axios.post("/api/create-session", {
    user: {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      role: user.is_customer ? "CUSTOMER" : "OTHER",
      extra_data: {
        dob: user.extra_data?.dob || "",
        phone_number: user.extra_data?.phone_number || "",
      },
      referral_code: user.referral_code ?? "",
    },
    accessToken: tokens.access,
    refreshToken: tokens.refresh,
  });

  if (!sessionRes?.data?.success) {
    toast.error("Failed to create session after booking");
    return false;
  }

  return true;
}
