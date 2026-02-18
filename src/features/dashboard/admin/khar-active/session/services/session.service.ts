import { useFetchQuery } from "@/hooks/useFetchQuery";
// get all bookings
export const All_SESSION_Bookings_KEY = "all-session";

export const getAllSession = (page: number, search: string) => {
  return useFetchQuery<any>(
    [All_SESSION_Bookings_KEY, page, search],
    `/active/admin/sessions/?p=${page}&search=${search}`,
    {}
  );
};
