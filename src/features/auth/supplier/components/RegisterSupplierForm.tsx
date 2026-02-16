"use client";

import {
  MultiStepFormWrapper,
  Step,
} from "@/components/multi-step-form-wrapper";
import {
  registerSupplier,
  step1AccountSchema,
  step2CompanySchema,
  step3AddressSchema,
  step4BankSchema,
  supplierRegisterSchema,
  type SupplierRegisterPayload,
} from "../services/supplierRegister.service";

import Step1Account from "./steps/Step1Account";
import Step2Company from "./steps/Step2Company";
import Step3Address from "./steps/Step3Address";
import Step4Bank from "./steps/Step4Bank";
import { useRouter } from "next/navigation";

export default function RegisterSupplierForm() {
  const router = useRouter();
  const initialData: Partial<SupplierRegisterPayload> = {
    email: "",
    password1: "",
    password2: "",

    company_name: "",
    company_registration_number: "",
    tax_id: "",

    street_name: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",

    bank_name: "",
    bank_account_holder_name: "",
    bank_account_number: "",
    bank_routing_number: "",
  };

  return (
    <MultiStepFormWrapper<SupplierRegisterPayload>
      schema={supplierRegisterSchema}
      initialData={initialData}
      mutationFn={registerSupplier}
      completeButtonText="Register"
      className="w-full max-w-xl rounded-[22px] border border-cyan-400/25 bg-[#071226]/70 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur mx-auto p-4"
      onSuccess={() => {
        router.push("/auth/verify-email");
      }}
    >
      <Step title="Account Details" schema={step1AccountSchema}>
        <Step1Account />
      </Step>

      <Step title="Company Details" schema={step2CompanySchema}>
        <Step2Company />
      </Step>

      <Step title="Address Details" schema={step3AddressSchema}>
        <Step3Address />
      </Step>

      <Step title="Bank Details" schema={step4BankSchema}>
        <Step4Bank />
      </Step>
    </MultiStepFormWrapper>
  );
}
