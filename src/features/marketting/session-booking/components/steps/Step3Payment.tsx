"use client";

import { useMultiStepForm } from "@/components/multi-step-form-wrapperEdited";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Check, Shield } from "lucide-react";
import Image from "next/image";
import paymentMethods from "../../constants/paymenMethd";

// ✅ add these imports (same as Step2)

import { useReferralValidation } from "./step2details/useReferralValidation";
import {
  calcDiscountAmount,
  formatDiscountLabel,
} from "./step2details/discount.utils";
import RowEdit from "../RowEdit";
import RightSideSummery from "./RightSideSummery";

const fmtDate = (d?: Date) => {
  if (!d) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Step3Payment({ locationData }: { locationData: any }) {
  const { form } = useMultiStepForm<any>();
  const selectedMethod = form.watch("paymentMethod");

  const location = locationData?.data?.title || "—";
  const date = form.watch("date") as Date | undefined;
  const sessionType = form.watch("sessionType") as string | undefined;
  const time = form.watch("selectedSlot") as string | undefined;

  const sessions = locationData?.data?.available_sessions ?? [];
  const price = Number(
    sessions.find((s: any) => s?.title === sessionType)?.price ?? 0
  );

  // ✅ referral/discount info (same hook you used in Step2)
  const { discountObj } = useReferralValidation(form);
  const discountValue = calcDiscountAmount(price, discountObj);
  const discountLabel = formatDiscountLabel(discountObj);
  const net = Math.max(0, price - discountValue);

  return (
    <Form {...form}>
      <main>
        <div className="bg-white rounded-xl shadow-sm border border-[#E6E6E6] overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Left */}
            <div className="md:col-span-2 p-8 border-r border-[#E6E6E6]">
              <h2 className="text-2xl font-bold text-[#111111] mb-6">
                Choose payment method
              </h2>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={() => (
                  <FormItem>
                    <div className="mb-8 max-h-105 overflow-y-auto pr-2">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {paymentMethods.map((method) => {
                          const active = selectedMethod === method.id;

                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() =>
                                form.setValue("paymentMethod", method.id, {
                                  shouldValidate: true,
                                })
                              }
                              className={`w-full cursor-pointer flex items-center justify-between p-3 md:p-4 rounded-lg border-2 transition-colors ${
                                active
                                  ? "border-[#ba170b] bg-white"
                                  : "border-[#E6E6E6] hover:border-[#CCCCCC]"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-lg border border-black/10 bg-white flex items-center justify-center overflow-hidden shrink-0">
                                  <Image
                                    src={(method as any).logo}
                                    alt={method.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                  />
                                </div>

                                <span className="text-[#111111] font-medium truncate">
                                  {method.name}
                                </span>
                              </div>

                              {active && (
                                <div className="w-6 h-6 rounded-full bg-[#ba170b] flex items-center justify-center shrink-0">
                                  <Check
                                    className="w-4 h-4 text-white"
                                    strokeWidth={3}
                                  />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <FormMessage className="text-destructive text-center" />
                  </FormItem>
                )}
              />

              <div className="mt-6 space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-[#444444]">
                  <Shield className="w-4 h-4" />
                  <span>Secure payment powered by payment gateway</span>
                </div>
                <p className="text-sm text-[#9A9A9A]">
                  You&apos;ll receive a ticket immediately after successful
                  payment.
                </p>
              </div>
            </div>

            {/* Right */}

            <div className="md:col-span-1">
              <RightSideSummery
                location={location}
                sessionType={sessionType}
                date={date}
                time={time}
                price={price}
                discount={discountValue}
                discountLabel={discountLabel}
                net={net}
              />
            </div>
            {/* end right */}
          </div>
        </div>
      </main>
    </Form>
  );
}
