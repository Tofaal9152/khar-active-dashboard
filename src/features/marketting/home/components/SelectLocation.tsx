"use client";

import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { nonPaginatedAllLocations } from "../../session-booking/services/session-booking.service";

const SelectLocation = () => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const { data: locationsData, isLoading, error } = nonPaginatedAllLocations();

  const locations = locationsData?.results ?? [];

  const handleContinueSchedule = () => {
    if (!selectedLocation) {
      return toast.error("Please select a location to continue");
    }
    router.push(`/session-booking/${selectedLocation}`);
  };
  return (
    <Card className="relative max-w-lg mx-auto md:mt-30">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold text-[#111111]">
          Select Location
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <AsyncStateWrapper loading={isLoading} error={error?.message}>
          {locations.map((location: any) => (
            <div
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className={`w-full p-4 text-left border rounded-md cursor-pointer transition
              ${
                selectedLocation === location.id
                  ? "border-red-600 ring-2 ring-red-500/40 bg-red-50/40"
                  : "border-black/10 hover:border-black/20"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#111111] wrap-break-word">
                    {location.title}
                  </h3>
                  <p className="text-sm text-[#444444] mt-0.5 wrap-break-word">
                    {location.address}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm shrink-0">
                  <span className="text-[#ba170b] font-medium">
                    Slots available today
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#ba170b]" />
                </div>
              </div>
            </div>
          ))}

          <Button
            className="w-full bg-[#ba170b] text-lg py-6 text-white font-medium hover:bg-[#a01409] transition-colors rounded-3xl"
            onClick={handleContinueSchedule}
            size="lg"
          >
            Continue to Schedule
          </Button>
        </AsyncStateWrapper>
      </CardContent>
    </Card>
  );
};

export default SelectLocation;
