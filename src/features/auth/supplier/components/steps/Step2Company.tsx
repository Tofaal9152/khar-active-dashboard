"use client";

import { useMultiStepForm } from "@/components/multi-step-form-wrapperEdited";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SupplierRegisterPayload } from "../../services/supplierRegister.service";

export default function Step2Company() {
  const { form } = useMultiStepForm<SupplierRegisterPayload>();

  const inputCls =
    "h-12 rounded-xl border-white/10 bg-[#050c1a] text-white placeholder:text-white/35 focus-visible:ring-cyan-400/40";
  const labelCls =
    "text-[11px] font-medium tracking-[0.22em] text-white/50";

  return (
    <Form {...form}>
      <div className="space-y-5">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>COMPANY NAME</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter company name" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company_registration_number"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center gap-2">
                <FormLabel className={labelCls}>COMPANY REGISTRATION NUMBER</FormLabel>
                <span className="text-[11px] text-white/35">Optional</span>
              </div>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter company registration number" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tax_id"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center gap-2">
                <FormLabel className={labelCls}>TAX ID</FormLabel>
                <span className="text-[11px] text-white/35">Optional</span>
              </div>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter tax ID" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="pt-2 text-center text-xs text-white/35">
          Registration and tax information is optional and can be updated later.
        </p>
      </div>
    </Form>
  );
}
