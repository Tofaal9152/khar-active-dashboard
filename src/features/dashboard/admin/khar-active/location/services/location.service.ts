import { useFetchQuery } from "@/hooks/useFetchQuery";
import httpClient from "@/utils/httpClient";
// get all bookings
export const ALL_LOCATION_KEY = "all-locations";

export const getAllLocation = (page: number, search: string) => {
  return useFetchQuery(
    [ALL_LOCATION_KEY, page, search],
    `/active/locations/?p=${page}&search=${search}`,
    {}
  );
};

/// add more location related services here

import { z } from "zod";

export const locationSchema = z.object({
  title: z.string().min(2, "Title required"),
  address: z.string().min(2, "Address required"),

  available_sessions: z
    .array(
      z.object({
        title: z.string().min(1, "Session title required"),
        price: z
          .number({ message: "Price must be a number" })
          .min(0, "Price must be >= 0"),
      })
    )
    .min(1, "At least 1 session required"),

  available_slots: z
    .array(
      z.object({
        title: z.string().min(1, "Slot title required"),
        max_capacity: z
          .number({ message: "Capacity must be a number" })
          .min(1, "Must be at least 1"),
      })
    )
    .min(1, "At least 1 slot required"),
});
export const createLocation = (payload: any) => {
  return httpClient.post(`/active/admin/locations/`, {
    title: payload.title,
    address: payload.address,
    available_sessions: payload.available_sessions,
    available_slots: payload.available_slots,
  });
};

export const updateLocation = (id: string, payload: any) => {
  return httpClient.put(`/active/admin/locations/?id=${id}`, {
    title: payload.title,
    address: payload.address,
    available_sessions: payload.available_sessions,
    available_slots: payload.available_slots,
  });
};
