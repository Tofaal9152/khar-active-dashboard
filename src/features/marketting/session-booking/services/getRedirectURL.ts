"use client";

import { toast } from "sonner";

export default function getRedirectURL(resData: any, cardname: string) {
  const paymentInfo = resData?.data?.payment?.desc;

  if (!Array.isArray(paymentInfo) || paymentInfo.length === 0) {
    toast.error("Payment information is missing");
    return null;
  }

  const selectedPayment = paymentInfo.find(
    (item: any) => item?.gw === cardname
  );

  if (!selectedPayment) {
    toast.error("Selected payment method not found");
    return null;
  }

  const redirectURL = selectedPayment?.redirectGatewayURL;

  if (!redirectURL) {
    toast.error("Redirect URL for payment not found");
    return null;
  }

  return redirectURL as string;
}
