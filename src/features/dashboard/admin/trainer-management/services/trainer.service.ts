import { useFetchData } from "@/hooks/useFetchData";
import { queryType } from "@/types/query.type";
import { makeEndpoint } from "@/utils/makeEndpoint";

export const GET_ALL_TRAINER_KEY = "getAllTrainer";
// get all non-paginated places
export const getAllTrainer = ({ query }: { query: queryType }) => {
  const endPoint = makeEndpoint("/administrator/trainers/", {
    p: query.page,
    search: query.search,
  });
  return useFetchData<any>({
    url: endPoint,
    querykey: [GET_ALL_TRAINER_KEY, query],
  });
};

// update trainer
import { request } from "@/lib/request";
import { z } from "zod";

const slotSchema = z.object({
  day_of_week: z.string().min(1, "Day of week is required"),
  start: z.string().min(1, "Start time is required"),
  end: z.string().min(1, "End time is required"),
});

export const trainerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // Uploaded file URL (returned from /upload-file/)
  profile_img_url: z.any().optional(),
  // Optional uploaded file URL (returned from /upload-file/)
  nid_img_url: z.any().optional(),
  phone_number: z.string().min(11, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  // Accepts either a number or a numeric string from the form input
  age: z.coerce.number().min(1, "Age is required"),
  address: z.string().min(1, "Address is required"),
  training_types: z
    .array(z.string())
    .min(1, "At least one training type is required"),
  training_locations: z
    .array(z.string())
    .min(1, "At least one location is required"),
  available_days_in_week: z.array(z.string()).min(1, "Select at least one day"),
  gender: z.enum(["Male", "Female"]).or(z.string().min(1)),
  bio: z.string().optional(),
  slots: z.array(slotSchema).optional(),
  is_approved: z.boolean().optional(),
  user: z.string().optional(), // Assuming user is identified by a string ID, adjust as needed
});

export type TrainerFormData = z.infer<typeof trainerSchema>;
// upload file
type UploadFileResponse = {
  success: boolean;
  filename: string;
  stored_path: string;
  compression_started: boolean;
};

export const uploadSingleFile = async (file: File): Promise<string> => {
  if (!(file instanceof File)) {
    throw new Error("Invalid file provided for upload");
  }

  const formData = new FormData();
  formData.append("file", file);
  // demo
  const res: any = await request.post<UploadFileResponse>(
    `/upload-file/`,
    formData,
  );

  const url = res?.data?.stored_path;
  if (!url) throw new Error("Upload succeeded but URL was not returned");
  return url;
};

export const updateTrainer = (
  payload: TrainerFormData,
  id: string,
  userId: string,
) => {
  return request.put(`/administrator/trainers/?id=${id}`, {
    name: payload.name,
    profile_img_url: safeEncodeUrl(payload.profile_img_url),
    nid_img_url: safeEncodeUrl(payload.nid_img_url),
    phone_number: payload.phone_number,
    email: payload.email,
    age: Number(payload.age),
    address: payload.address,
    training_types: payload.training_types,
    training_locations: payload.training_locations,
    // Note: Mapping corrected spelling (frontend) to payload spelling (backend)
    availabile_days_in_week: payload.available_days_in_week,
    gender: payload.gender ? payload.gender.toString() : "",
    bio: payload.bio,
    slots: payload.slots,
    is_approved: payload.is_approved,
    user: userId,
  });
};
/* ================= Create ================= */
const safeEncodeUrl = (v: unknown) => {
  const s = String(v ?? "").trim();
  return s ? encodeURI(s) : "";
};
