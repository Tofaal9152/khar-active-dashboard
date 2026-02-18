import { useFetchQuery } from "@/hooks/useFetchQuery";
// get all bookings
export const ALL_BOOKINGS_KEY = "all-bookings";

export const getAllSessionBookings = (page: number, search: string) => {
  return useFetchQuery(
    [ALL_BOOKINGS_KEY, page, search],
    `/active/admin/bookings/?p=${page}&search=${search}`,
    {}
  );
};
