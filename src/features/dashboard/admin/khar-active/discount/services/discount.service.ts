import { useFetchQuery } from "@/hooks/useFetchQuery";
import httpClient from "@/utils/httpClient";

export const ALL_DISCOUNT_KEY = "all-discounts";

export const getAllDiscount = () => {
  return useFetchQuery<any>([ALL_DISCOUNT_KEY], `/active/admin/discount/`, {});
};
import { z } from "zod";

export const discountSchema = z.object({
  discountType: z.enum(["percentage", "fixed"], {
    message: "Discount type is required",
  }),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
});

export const createDiscount = async (payload: any) => {
  return httpClient.post(`/active/admin/discount/`, {
    discount_type: payload.discountType,
    amount: Number(payload.amount),
  });
};
