import { useFetchQuery } from "@/hooks/useFetchQuery";

export const getConfirmedBookingById = (bookingId: string) => {
  return useFetchQuery<any>(
    ["confirmed-booking", bookingId],
    `/active/bookings/?id=${bookingId}`,
    {
      enabled: !!bookingId,
    }
  );
};

//
export const DOWNLOAD_QR_API = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data";