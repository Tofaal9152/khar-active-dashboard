import { useFetchQuery } from "@/hooks/useFetchQuery";

export const getMyReferrals = () => {
  return useFetchQuery<any>(["my-referrals"], `/active/referral/my/`, {});
};

// validate referral code
export const validateReferralCode = (code: string, email: string) => {
  return useFetchQuery<any>(
    ["validate-referral-code", code],
    `/active/referral/validate/?referral_code=${code}&email=${encodeURIComponent(email)}`,
    {
      enabled: !!code,
      retry: false,
    },
  );
};
