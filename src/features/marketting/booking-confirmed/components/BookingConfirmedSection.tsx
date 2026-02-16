"use client";

import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDownloadInvoice } from "../../my-bookings/services/my-booking.service";
import {
  DOWNLOAD_QR_API,
  getConfirmedBookingById,
} from "../services/booking-confirmed.service";
import BackgroundSketches from "./BackgroundSketches";
import { useRouter } from "next/navigation";

const formatMoney = (n: any) => {
  const v = Number(n ?? 0);
  if (!Number.isFinite(v)) return "0.00";
  return v.toFixed(2);
};

export default function BookingConfirmedSection({
  bookingId,
}: {
  bookingId: string;
}) {
  const router = useRouter();
  const {
    data: bookingData,
    isLoading,
    error,
  } = getConfirmedBookingById(bookingId);

  // ✅ just the API data
  const b = bookingData?.data;
  console.log(b);
  const total = Number(b?.total_price ?? 0);
  const discount = Number(b?.discount_amount ?? 0);

  // ✅ QR image source (as you asked)
  const qrData = b?.id ?? b?.ref_id ?? bookingId;
  const qrSrc = `${DOWNLOAD_QR_API}=${encodeURIComponent(String(qrData))}`;
  // download ticket function
  const m = useDownloadInvoice();
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F3F1EE]">
      <AsyncStateWrapper loading={isLoading} error={error?.message}>
        <main className="relative z-10 px-6 md:px-12 lg:px-20 ">
          <div className="max-w-xl mx-auto">
            <div
              className="bg-white rounded-xl shadow-sm border border-[#E6E6E6] md:p-8 p-4
            "
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h1
                  className="text-3xl font-bold text-[#111111] mb-2"
                  data-testid="text-booking-confirmed"
                >
                  Booking Confirmed
                </h1>
                <p className="text-[#444444]">
                  Your spot is reserved. Show this ticket at entry.
                </p>
              </div>

              {/* Booking Details */}
              <div className="bg-[#F5F5F3] rounded-lg p-6 mb-6">
                <h2
                  className="font-semibold text-[#111111] mb-4"
                  data-testid="text-booking-details"
                >
                  Booking Details
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#444444]">Location</span>
                    <span className="text-[#111111] font-medium">
                      {b?.selected_session?.location?.title ??
                        b?.selected_session?.location ??
                        "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#444444]">Session Type</span>
                    <span className="text-[#111111] font-medium">
                      {b?.session_type ?? "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#444444]">Date</span>
                    <span className="text-[#111111] font-medium">
                      {b?.date}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#444444]">Time</span>
                    <span className="text-[#111111] font-medium">
                      {b?.selected_session?.slot?.title ??
                        b?.selected_slot ??
                        "-"}
                    </span>
                  </div>

                  <div className="border-t border-[#E6E6E6] pt-3 mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#444444]">
                        Total (with discount)
                      </span>
                      <span className="text-[#111111] font-bold">
                        ৳{formatMoney(total)} BDT
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#444444]">Discount</span>
                      <span className="text-[#111111] font-medium">
                        ৳{formatMoney(discount)} BDT
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-[#E6E6E6] pt-3">
                    <div className="flex justify-between">
                      <span className="text-[#111111] font-semibold">Net</span>
                      <span className="text-[#111111] font-bold text-lg">
                        ৳{formatMoney(total)} BDT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Ticket Info + QR image */}
              <div className="bg-[#F5F5F3] rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white  border border-[#E6E6E6] flex items-center justify-center overflow-hidden">
                    {/* ✅ Real QR image */}
                    <Image
                      src={qrSrc}
                      alt="QR Code"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p
                      className="font-semibold text-[#111111]"
                      data-testid="text-ticket-id"
                    >
                      {b?.ref_id ?? b?.id ?? "-"}
                    </p>
                    <p className="text-sm text-[#444444]">
                      Issued to: {b?.full_name ?? "-"} •{" "}
                      {b?.phone_number ?? "-"}
                    </p>
                  </div>
                </div>
              </div>
              {/* Email Confirmation Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-green-700 text-sm font-medium">
                  An invoice has been sent to your email address.
                </p>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                <Button
                  className="flex-1 py-5 md:text-lg bg-[#ba170b] text-white font-medium hover:bg-[#a01409] transition-colors"
                  style={{ borderRadius: "2rem" }}
                  data-testid="button-download-ticket"
                  onClick={() => m.mutate(b?.id ?? "")}
                  disabled={m.isPending}
                >
                  {m.isPending ? "Downloading..." : "Download Ticket"}
                </Button>
                <Button
                  variant={"outline"}
                  className="flex-1 py-5 md:text-lg border-2 border-[#ba170b] text-[#ba170b] font-medium hover:bg-[#ba170b] hover:text-white transition-colors"
                  style={{ borderRadius: "2rem" }}
                  data-testid="button-resend-email"
                  onClick={() => router.push("/")}
                >
                  Book another session
                </Button>
              </div>
            </div>
          </div>
        </main>
      </AsyncStateWrapper>

      <BackgroundSketches />
    </div>
  );
}
