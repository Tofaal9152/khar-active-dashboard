"use client";

import { useEffect, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { validateReferralCode } from "@/features/marketting/home/services/referral.service";
import type { Discount } from "./discount.utils";

function pickErrorMessage(err: any) {
  // axios style
  const axiosMsg =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.response?.data?.detail;

  return axiosMsg || err?.message || "Referral code is invalid";
}

export function useReferralValidation(form: any) {
  const referralRaw = form.watch("referral_code") as string | undefined;

  const referralCode = useMemo(() => (referralRaw || "").trim(), [referralRaw]);

  // ✅ debounce
  const debouncedCode = useDebounce(referralCode, 600);

  // ✅ only call if length >= 3

  const referralQuery = validateReferralCode(
    debouncedCode,
    form.getValues("email"),
  );

  const referralRes = referralQuery.data as any | undefined;

  // ✅ valid determination (support multiple response shapes)
  const referralValid: boolean =
    referralRes?.valid ??
    referralRes?.data?.valid ??
    referralRes?.success ?? // your API: { success: false, message: ... }
    referralRes?.data?.success ??
    false;

  // ✅ message determination (support: {success:false,message:"..."} )
  const referralMessage: string =
    referralRes?.message ??
    referralRes?.data?.message ??
    (referralQuery.isError ? pickErrorMessage(referralQuery.error) : "") ??
    (referralValid ? "Referral code applied" : "Referral code is invalid");

  // ✅ discount object: {discount_type:"percentage"|"fixed", amount:number}
  const discountObj: Discount | undefined =
    referralRes?.discount ??
    referralRes?.data?.discount ??
    referralRes?.discount_details ??
    referralRes?.data?.discount_details ??
    (referralRes?.discount_type ? referralRes : undefined) ??
    (referralRes?.data?.discount_type ? referralRes.data : undefined);

  // ✅ status derive
  const referralStatus = !referralCode
    ? "idle"
    : referralQuery.isFetching
      ? "checking"
      : referralQuery.isError
        ? "invalid"
        : referralQuery.isSuccess
          ? referralValid
            ? "valid"
            : "invalid"
          : "idle";

  // ✅ form এ value রাখো (Step validate এটা পড়বে)
  form.setValue("referral_status", referralStatus, {
    shouldDirty: false,
    shouldTouch: false,
    shouldValidate: false,
  });

  // ✅ set / clear form error
  useEffect(() => {
    if (!referralCode) {
      form.clearErrors("referral_code");
      return;
    }

    // wait for debounce
    if (referralCode !== debouncedCode) return;

    // if request failed => set error
    if (referralQuery.isError) {
      form.setError("referral_code", {
        type: "manual",
        message: pickErrorMessage(referralQuery.error),
      });
      return;
    }

    // success but invalid
    if (referralQuery.isSuccess && !referralValid) {
      form.setError("referral_code", {
        type: "manual",
        message: referralMessage,
      });
      return;
    }

    // valid
    if (referralQuery.isSuccess && referralValid) {
      form.clearErrors("referral_code");
    }
  }, [
    referralCode,
    debouncedCode,
    referralQuery.isError,
    referralQuery.isSuccess,
    referralQuery.error,
    referralValid,
    referralMessage,
    form,
  ]);

  return {
    referralCode,
    referralQuery,
    referralValid,
    referralMessage,
    discountObj,
  };
}
