import { useFetchQuery } from "@/hooks/useFetchQuery";
import httpClient from "@/utils/httpClient";
// get all bookings
export const ALL_TRAINER_KEY = "all-trainers";

export const getAllTrainer = (page: number, search: string) => {
  return useFetchQuery<any>(
    [ALL_TRAINER_KEY, page, search],
    `/active/admin/trainers/?p=${page}&search=${search}`,
    {}
  );
};

/// add more trainer related services here

import { z } from "zod";

export const trainerSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Valid email required"),
  phoneNumber: z.string().min(6, "Valid phone required"),
});

export const createTrainer = (payload: any) => {
  return httpClient.post(`/active/admin/trainers/`, {
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    phone_number: payload.phoneNumber,
  });
};

export const updateTrainer = (id: string, payload: any) => {
  return httpClient.put(`/active/admin/trainers/?id=${id}`, {
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    phone_number: payload.phoneNumber,
  });
};

// get all locations non paginated
export const getAllTrainerNonPaginated = () => {
  return useFetchQuery<any>(
    ["all-trainers-non-paginated"],
    `/active/admin/trainers/?page_size=1000`,
    {}
  );
};
