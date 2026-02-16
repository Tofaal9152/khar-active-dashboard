"use client";

import { useMultiStepForm } from "@/components/multi-step-form-wrapperEdited";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import ReferralCodeField from "./ReferralCodeField";
import { useReferralValidation } from "./useReferralValidation";
import RightSideSummery from "../RightSideSummery";
import { calcDiscountAmount, formatDiscountLabel } from "./discount.utils";

export default function Step2details({
  locationData,
  session,
}: {
  locationData: any;
  session: any;
}) {
  const { form } = useMultiStepForm<any>();

  const location = locationData?.data?.title || "—";
  const date = form.watch("date") as Date | undefined;
  const sessionType = form.watch("sessionType") as string | undefined;
  const time = form.watch("selectedSlot") as string | undefined;

  const {
    referralCode,
    referralQuery,
    referralValid,
    referralMessage,
    discountObj,
  } = useReferralValidation(form);

  const sessions = locationData?.data?.available_sessions ?? [];
  const price = Number(
    sessions.find((s: any) => s.title === sessionType)?.price ?? 0
  );

  const discountValue = calcDiscountAmount(price, discountObj);
  const net = Math.max(0, price - discountValue);
  const discountLabel = formatDiscountLabel(discountObj);

  return (
    <Form {...form}>
      <div className="bg-white rounded-xl shadow-sm border border-[#E6E6E6] overflow-hidden">
        <div className="grid md:grid-cols-3">
          {/* LEFT – USER INFO */}
          <div className="md:col-span-2 p-8 border-r border-[#E6E6E6] space-y-6">
            <h2 className="text-2xl font-bold text-[#111111]">
              Enter your information
            </h2>
            <p className="text-sm text-[#444444]">
              We&apos;ll send your ticket to your email and phone.
            </p>

            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Your name"
                      disabled={!!session}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DOB */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type="date"
                      disabled={!!session}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 border border-r-0 border-[#E6E6E6] bg-[#F5F5F5] text-[#444444] rounded-l-md">
                        +88
                      </span>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="rounded-l-none"
                        disabled={!!session}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type="email"
                      placeholder="you@email.com"
                      disabled={!!session}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            {!session && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type="password"
                        placeholder="At least 6 characters"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Referral Code */}
            <ReferralCodeField
              form={form}
              referralCode={referralCode}
              referralQuery={referralQuery}
              referralValid={referralValid}
              referralMessage={referralMessage}
            />
          </div>

          {/* RIGHT – SUMMARY */}
          <RightSideSummery
            location={location}
            date={date}
            sessionType={sessionType}
            time={time}
            price={price}
            discount={discountValue}
            discountLabel={discountLabel}
            net={net}
          />
        </div>
      </div>
    </Form>
  );
}
