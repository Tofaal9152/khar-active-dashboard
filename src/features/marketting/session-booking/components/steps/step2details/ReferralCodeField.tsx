"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

type Props = {
  form: any;
  referralCode: string;
  referralQuery: any;
  referralValid: boolean;
  referralMessage: string;
};

function pickErrorMessage(err: any) {
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.response?.data?.detail ||
    err?.message ||
    "Referral code is invalid"
  );
}

export default function ReferralCodeField({
  form,
  referralCode,
  referralQuery,
  referralValid,
  referralMessage,
}: Props) {
  const showStatus = !!referralCode;
  const isLoading = referralQuery?.isFetching;

  const isOk = referralQuery?.isSuccess && referralValid;

  // ✅ invalid = (success but invalid) OR (request error)
  const isInvalid =
    (referralQuery?.isSuccess && !referralValid) || referralQuery?.isError;

  //   const messageToShow = referralQuery?.isError
  //     ? pickErrorMessage(referralQuery?.error)
  //     : referralMessage;

  return (
    <FormField
      control={form.control}
      name="referral_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Enter referral code (if any)</FormLabel>

          <FormControl>
            <div className="relative">
              <Input {...field} value={field.value ?? ""} />

              {showStatus && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  ) : isOk ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : isInvalid ? (
                    <XCircle className="h-4 w-4 text-red-600" />
                  ) : null}
                </div>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
