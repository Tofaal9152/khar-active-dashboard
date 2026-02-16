"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMultiStepForm } from "@/components/multi-step-form-wrapperEdited";
import { useMemo, useState } from "react";

export default function Step1Scheduler({
  locationData,
}: {
  locationData: any;
}) {
  const { form } = useMultiStepForm<any>();

  const availableSessions = locationData?.data?.available_sessions ?? [];
  const availableSlots = locationData?.data?.available_slots ?? [];

  const selectedSlot = form.watch("selectedSlot");
  const selectedSessionType = form.watch("sessionType");

  const [showAllSlots, setShowAllSlots] = useState(false);
  const [showAllSessions, setShowAllSessions] = useState(false);

  const slotLimit = 5;
  const sessionLimit = 4;

  const shownSlots = useMemo(
    () => (showAllSlots ? availableSlots : availableSlots.slice(0, slotLimit)),
    [availableSlots, showAllSlots]
  );

  const shownSessions = useMemo(
    () =>
      showAllSessions
        ? availableSessions
        : availableSessions.slice(0, sessionLimit),
    [availableSessions, showAllSessions]
  );

  return (
    <Form {...form}>
      <div className="bg-white rounded-xl shadow-sm border border-[#E6E6E6] overflow-hidden">
        <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch">
          {/* Left */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-[#111111] mb-4">
              Select Date
            </h2>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="rounded-[14px] border border-black/10 bg-white/60 px-4 py-3">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(d) => field.onChange(d ?? new Date())}
                        className="w-full p-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
          </div>

          {/* Divider */}
          <div className="hidden md:flex h-full items-stretch">
            <Separator orientation="vertical" className="h-full bg-black/10" />
          </div>
          <div className="md:hidden px-6">
            <Separator className="bg-black/10" />
          </div>

          {/* Right */}
          <div className="p-6">
            <div className="space-y-5">
              {/* Slots */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#111111]">
                    Available Slots
                  </h2>

                  {availableSlots.length > slotLimit && (
                    <button
                      type="button"
                      onClick={() => setShowAllSlots((v) => !v)}
                      className="text-sm font-medium text-[#ba170b] hover:underline"
                    >
                      {showAllSlots ? "Show less" : "Show all"}
                    </button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="selectedSlot"
                  render={() => (
                    <FormItem>
                      <div className="max-h-[220px] overflow-y-auto pr-1 space-y-2">
                        {availableSlots.length === 0 ? (
                          <div className="text-sm text-gray-500">
                            No slots available
                          </div>
                        ) : (
                          shownSlots.map((s: any, idx: number) => {
                            const slotTitle = s?.title ?? "";
                            const seats = Number(s?.max_capacity ?? 0);
                            const isSelected = selectedSlot === slotTitle;

                            return (
                              <div
                                key={`${slotTitle}-${idx}`}
                                onClick={() =>
                                  form.setValue("selectedSlot", slotTitle, {
                                    shouldValidate: true,
                                  })
                                }
                                className={`w-full rounded-[12px] border px-4 py-3 text-left flex items-center justify-between transition-all cursor-pointer hover:border-black/20 ${
                                  isSelected
                                    ? "border-[#ba170b] bg-[#ba170b]/10"
                                    : "bg-white border-black/10"
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className="text-sm font-medium text-[#111111] truncate">
                                    {slotTitle}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="border-black/10 bg-black/5 text-[#111111] whitespace-nowrap"
                                  >
                                    Seats: {seats}
                                  </Badge>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Session Type */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#111111]">
                    Session Type
                  </h2>

                  {availableSessions.length > sessionLimit && (
                    <button
                      type="button"
                      onClick={() => setShowAllSessions((v) => !v)}
                      className="text-sm font-medium text-[#ba170b] hover:underline"
                    >
                      {showAllSessions ? "Show less" : "Show all"}
                    </button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="sessionType"
                  render={() => (
                    <FormItem>
                      <div className="max-h-[220px] overflow-y-auto pr-1 space-y-2">
                        {availableSessions.length === 0 ? (
                          <div className="text-sm text-gray-500">
                            No sessions available
                          </div>
                        ) : (
                          shownSessions.map((p: any, idx: number) => {
                            const title = p?.title ?? "";
                            const price = Number(p?.price ?? 0);
                            const isSelected = selectedSessionType === title;

                            return (
                              <div
                                key={`${title}-${idx}`}
                                onClick={() =>
                                  form.setValue("sessionType", title, {
                                    shouldValidate: true,
                                  })
                                }
                                className={[
                                  "w-full rounded-[12px] border px-4 py-3 text-left flex items-center justify-between transition-colors",
                                  "cursor-pointer hover:border-black/20",
                                  isSelected
                                    ? "border-[#ba170b] bg-[#ba170b]/12"
                                    : "bg-white border-black/10",
                                ].join(" ")}
                              >
                                <span className="text-sm font-medium text-[#111111]">
                                  {title}
                                </span>
                                <span className="text-sm font-semibold text-[#111111] whitespace-nowrap">
                                  ৳{price} BDT
                                </span>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <FormMessage className="text-destructive mt-2" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
