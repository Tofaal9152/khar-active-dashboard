import httpClient from "@/utils/httpClient";
import { z } from "zod";

export const userRegistrationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password1: z.string().min(6, "Password must be at least 6 characters"),
    password2: z.string().min(6, "Password must be at least 6 characters"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    profile_picture: z.any().optional(),
    date_of_birth: z.string().min(1, "Date of birth is required"),
    country: z.string().min(1, "Country is required"),
    address: z.string().min(1, "Address is required"),
    passport_number: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;

// Create User
export const createUser = (payload: UserRegistrationFormData) => {
  // console.log("payload", payload);
  return httpClient.post(`/customers/register/`, payload);
};
