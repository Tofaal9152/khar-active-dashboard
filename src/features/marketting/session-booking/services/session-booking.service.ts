import { useFetchQuery } from "@/hooks/useFetchQuery";
import httpClient from "@/utils/httpClient";
import { z } from "zod";
import NormalizedPhoneNumber from "../utils/NormalizedPhoneNumber";
import toYYYYMMDD from "../utils/toYYYYMMDD";
import { CreateSession } from "@/utils/session";

/** Step 1: location from URL query(home) */
export const step1Schema = z.object({
  location_id: z.string().min(1, "Location is required"),
});

/** Step 2: schedule */
export const step2Schema = z.object({
  date: z.date({ message: "Select a date" }),
  sessionType: z.string().min(1, "Select a session type"),
  selectedSlot: z.string().min(1, "Select a time slot"),
});

/** Step 3: details */
export const step3Schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(11, "Phone number must be 11 digits"),
  dob: z.string().min(1, "Date of Birth is required"),
  email: z.string().email("Invalid email"),
  password: z.string().optional(),
  referral_code: z.string().optional().default(""),
  agreeTerms: z.boolean().refine((v) => v === true, {
    message: "You must agree to Terms & Privacy",
  }),
});

/** Step 4: payment */
export const step4Schema = z.object({
  paymentMethod: z.enum(
    [
      "bkash",
      "nagad",
      "upay",
      "m_ibbl",
      "mobilemoney",
      "okwalletgw",
      "pathaopay",
      "abdirect",
      "ibbl",
      "mtbl",
      "bankasia",
      "ipay",
      "fsibl",
      "meghna",
    ],
    {
      message: "Select a payment method",
    }
  ),
});

export const sessionBookingSchema = step1Schema
  .and(step2Schema)
  .and(step3Schema)
  .and(step4Schema);

export type SessionBookingData = z.infer<typeof sessionBookingSchema>;

// create session booking

export async function createSessionBooking(payload: SessionBookingData) {
  // return Promise.resolve({ success: true });
  return httpClient.post(`/active/bookings/`, {
    location_id: payload.location_id,
    full_name: payload.fullName,
    dob: payload.dob,
    phone_number: NormalizedPhoneNumber(payload.phoneNumber),
    email: payload.email,
    password: payload.password,
    selected_slot: payload.selectedSlot,
    session_type: payload.sessionType,
    date: toYYYYMMDD(payload.date),
    referral_code: payload.referral_code || undefined,
    payment_method: payload.paymentMethod,
  });
}

// get all locations non paginated
export const nonPaginatedAllLocations = () => {
  return useFetchQuery<any>(
    ["all-locations-non-paginated"],
    `/active/locations/?page_size=1000`,
    {}
  );
};

// location details by id
export const getLocationById = (id: string) => {
  return useFetchQuery<any>(
    ["location-by-id", id],
    `/active/locations/?id=${id}`,
    {
      enabled: !!id,
    }
  );
};
