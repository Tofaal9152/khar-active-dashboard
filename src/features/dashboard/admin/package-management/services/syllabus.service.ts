import { useFetchData } from "@/hooks/useFetchData";
import { request } from "@/lib/request";
import { makeEndpoint } from "@/utils/makeEndpoint";
import { z } from "zod";

/* ================= Keys ================= */
export const GET_ALL_SYLLABUS_KEY = "getAllSyllabus";

/* ================= Get All ================= */
export const getAllSyllabus = ({
  query,
}: {
  query: {
    page?: number;
    search?: string;
    packageId?: string; // Add package ID to query parameters
  };
}) => {
  const endPoint = makeEndpoint("/administrator/syllabus/", {
    p: query.page,
    search: query.search,
    "package-id": query.packageId, // Add package ID filter
  });

  return useFetchData<any>({
    url: endPoint,
    querykey: [GET_ALL_SYLLABUS_KEY, query],
  });
};

/* ================= Schema ================= */
export const syllabusSchema = z.object({
  package: z.string().min(1, "Package is required"),
  day: z.string().min(1, "Day is required"),
  description: z.string().min(1, "Description is required"),
});

export type SyllabusFormData = z.infer<typeof syllabusSchema>;

/* ================= Create ================= */
export const createSyllabus = (payload: SyllabusFormData) => {
  return request.post(`/administrator/syllabus/`, {
    package: payload.package,
    day: payload.day,
    description: payload.description,
  });
};

/* ================= Update ================= */
export const updateSyllabus = (payload: SyllabusFormData, id: string) => {
  return request.put(`/administrator/syllabus/?id=${id}`, {
    package: payload.package,
    day: payload.day,
    description: payload.description,
  });
};
