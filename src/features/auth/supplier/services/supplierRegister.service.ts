import httpClient from "@/utils/httpClient";
import { z } from "zod";
// import { api } from "@/lib/api"; // <-- use your axios/fetch client

// Step 1: Account
export const step1AccountSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password1: z.string().min(6, "Password must be at least 6 characters"),
    password2: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((v) => v.password1 === v.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

// Step 2: Company
export const step2CompanySchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  company_registration_number: z.string().optional().or(z.literal("")),
  tax_id: z.string().optional().or(z.literal("")),
});

// Step 3: Address
export const step3AddressSchema = z.object({
  street_name: z.string().min(1, "Street name is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

// Step 4: Bank
export const step4BankSchema = z.object({
  bank_name: z.string().min(1, "Bank name is required"),
  bank_account_holder_name: z
    .string()
    .min(1, "Account holder name is required"),
  bank_account_number: z.string().min(1, "Account number is required"),
  bank_routing_number: z.string().min(1, "Routing number is required"),
});

// Full schema (payload)
export const supplierRegisterSchema = step1AccountSchema
  .and(step2CompanySchema)
  .and(step3AddressSchema)
  .and(step4BankSchema);

export type SupplierRegisterPayload = z.infer<typeof supplierRegisterSchema>;

export async function registerSupplier(values: SupplierRegisterPayload) {
 
  return httpClient.post("/suppliers/register/", values);
}
