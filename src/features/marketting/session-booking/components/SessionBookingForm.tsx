"use client";

import {
  MultiStepFormWrapper,
  Step,
} from "@/components/multi-step-form-wrapperEdited";
import { useRouter } from "next/navigation";

import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import { onBookingSuccess } from "../services/onBookingSuccess";
import {
  SessionBookingData,
  createSessionBooking,
  getLocationById,
  sessionBookingSchema,
  step2Schema,
  step3Schema,
} from "../services/session-booking.service";
import Stepper from "./Stepper";
import Step1Scheduler from "./steps/Step1Scheduler";
import Step2details from "./steps/step2details/Step2details";
import Step3Payment from "./steps/Step3Payment";

export default function SessionBookingForm({
  locationId,
  session,
}: {
  locationId: string;
  session: any;
}) {
  const { data: locationData, isLoading, error } = getLocationById(locationId);
  const router = useRouter();

  const handleSubmit = (payload: SessionBookingData) =>
    createSessionBooking(payload);

  return (
    <AsyncStateWrapper loading={isLoading} error={error?.message}>
      <MultiStepFormWrapper<SessionBookingData>
        schema={sessionBookingSchema}
        initialData={{
          location_id: locationId,
          date: new Date(),
          sessionType: "",
          selectedSlot: "",
          fullName: session?.user?.full_name || "",
          phoneNumber: session?.user?.extra_data?.phone_number || "",
          dob: session?.user?.extra_data?.dob || "",
          email: session?.user?.email || "",
          referral_code: "",
          agreeTerms: true,
          paymentMethod: "bkash",
        }}
        mutationFn={handleSubmit}
        nextButtonText="Continue"
        prevButtonText="Back"
        completeButtonText="Pay Now"
        onSuccess={(resData, payload) =>
          onBookingSuccess(resData, router, payload.paymentMethod, session)
        }
        showStepTitle={false}
        showStepIndicator={false}
        className="bg-transparent shadow-none border-0 p-0 max-w-4xl mx-auto z-10"
        firstStepBackUrl={"/"}
      >
        <Step schema={step2Schema}>
          <Stepper currentStep={2} />
          <Step1Scheduler locationData={locationData} />
        </Step>

        <Step
          schema={step3Schema}
          validate={async (data: any) => {
            const code = String(data?.referral_code ?? "").trim();

            // ✅ referral code না দিলে problem নাই
            if (!code) return true;

            // ✅ referral code দিলে: valid না হলে Step 3 যাবে না
            const st = data?.referral_status; // "idle" | "checking" | "valid" | "invalid"
            if (!st || st === "checking") return false;
            return st === "valid";
          }}
          validationMessage="Referral code is invalid. Remove it or use a valid one."
        >
          <Stepper currentStep={3} />
          <Step2details locationData={locationData} session={session} />
        </Step>

        <Step>
          <Stepper currentStep={4} />
          <Step3Payment locationData={locationData} />
        </Step>
      </MultiStepFormWrapper>
    </AsyncStateWrapper>
  );
}
