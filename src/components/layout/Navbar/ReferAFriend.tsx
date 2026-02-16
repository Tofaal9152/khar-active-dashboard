"use client";
import { AppDialog } from "@/components/shared/AppDialog";
import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import { getMyReferrals } from "@/features/marketting/home/services/referral.service";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const ReferAFriend = () => {
  const { isLoading, error, data: referralsData } = getMyReferrals();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (referralsData?.data) {
      await navigator.clipboard.writeText(referralsData.data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AppDialog
      title="Refer a Friend"
      description="Share the Referral code with your friends"
      trigger={
        <div
          className="transition-colors  cursor-pointer w-full"
          data-testid="link-my-booking"
        >
          Refer a Friend
        </div>
      }
    >
      <AsyncStateWrapper loading={isLoading} error={error?.message}>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 ">
            <span className="text-xl font-bold tracking-wider text-gray-800">
              {referralsData?.data}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
          {copied && (
            <span className="text-sm text-green-600">Copied to clipboard!</span>
          )}
        </div>
      </AsyncStateWrapper>
    </AppDialog>
  );
};

export default ReferAFriend;
