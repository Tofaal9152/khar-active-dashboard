import { useFetchQuery } from "@/hooks/useFetchQuery";
import httpClient from "@/utils/httpClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// get all bookings

export const getAllBookings = (page: number, search: string) => {
  return useFetchQuery<any>(
    ["all-bookings", page, search],
    `/active/bookings/my/?p=${page}&search=${search}`,
    {}
  );
};
// download booking invoice
async function downloadInvoice(bookingId: string) {
  const blob = await httpClient.getBlob(
    `/active/bookings/pdf/?id=${bookingId}`
  );
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${bookingId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
}
// hook to download invoice
export function useDownloadInvoice() {
  return useMutation({
    mutationFn: (bookingId: string) => downloadInvoice(bookingId),
    onError: (err: any) => toast.error(err?.message || "Download failed"),
  });
}
