"use server";
import axios from "axios";
import { LoginType } from "../../../types/auth/auth.types";
import { LoginSchema } from "../../../schemas/auth/signin/sign-in.schema";
import { validateForm } from "@/utils/validateForm";

import HandleError from "@/utils/errorHandle";
import { env } from "@/config/env.server";
import { CreateSession } from "@/utils/session";

export const SignInAction = async (
  previousState: LoginType,
  formData: FormData
): Promise<LoginType> => {
  const validationErrors = validateForm(LoginSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const base = env.BACKEND_URL;
    const { data } = await axios.post(
      `${base}/rest-auth/login/`,
      {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await CreateSession({
      user: {
        id: String(data?.user?.pk),
        username: data?.user?.username ?? "",
        full_name:
          (data?.user?.first_name ?? "") + " " + (data?.user?.last_name ?? ""),
        email: data?.user?.email ?? "",
        role: data?.role,
        extra_data: {
          dob: data?.user?.extra_data?.dob || "",
          phone_number: data?.user?.extra_data?.phone_number || "",
        },
        referral_code: data?.user?.referral_code ?? "",
      },
      accessToken: data?.access,
      refreshToken: data?.refresh,
    });

    return { success: true, errors: {} };
  } catch (error) {
    return HandleError(error);
  }
};
