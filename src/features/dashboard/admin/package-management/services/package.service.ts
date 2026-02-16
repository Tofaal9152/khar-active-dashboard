import { useFetchData } from "@/hooks/useFetchData";
import { queryType } from "@/types/query.type";
import { makeEndpoint } from "@/utils/makeEndpoint";
import { request } from "@/lib/request";
import { z } from "zod";

/* ================= Keys ================= */
export const GET_ALL_PACKAGE_KEY = "getAllPackage";
export const GET_PACKAGE_LIST_KEY = "getPackageList";

/* ================= Get All ================= */
export const getAllPackage = ({ query }: { query: queryType }) => {
  const endPoint = makeEndpoint("/administrator/packages/", {
    p: query.page,
    search: query.search,
  });

  return useFetchData<any>({
    url: endPoint,
    querykey: [GET_ALL_PACKAGE_KEY, query],
  });
};
export const getPackageList = () => {
  return useFetchData<any>({
    url: "/administrator/packages/?view=list",
    querykey: [GET_PACKAGE_LIST_KEY],
  });
};

/* ================= Schema ================= */
export const packageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  // if backend accepts string, keep string; otherwise use z.coerce.number()
  price: z.string().min(1, "Price is required"),
  img_url: z.any().optional(),
});

export type PackageFormData = z.infer<typeof packageSchema>;

/* ================= Create ================= */
export const createPackage = (payload: PackageFormData) => {
  return request.post(`/administrator/packages/`, {
    title: payload.title,
    description: payload.description,
    price: payload.price, // keep as string as your API example
    img_url: safeEncodeUrl(payload.img_url),
  });
};

/* ================= Update ================= */
// your trainer update uses: PUT `/administrator/trainers/?id=${id}`
// so package update same style:
export const updatePackage = (payload: PackageFormData, id: string) => {
  return request.put(`/administrator/packages/?id=${id}`, {
    title: payload.title,
    description: payload.description,
    price: payload.price,
    img_url: safeEncodeUrl(payload.img_url),
  });
};

/* ================= Helpers ================= */
const safeEncodeUrl = (v: unknown) => {
  const s = String(v ?? "").trim();
  return s ? encodeURI(s) : "";
};
