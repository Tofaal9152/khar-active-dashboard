"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMultiStepForm } from "@/components/multi-step-form-wrapperEdited";
import type { SupplierRegisterPayload } from "../../services/supplierRegister.service";

export default function Step3Address() {
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
          name="street_name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>STREET NAME</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter street name" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>CITY</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter city" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>STATE / PROVINCE</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter state or province" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postal_code"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>POSTAL / ZIP CODE</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter postal or zip code" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>COUNTRY</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter country" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="pt-2 text-center text-xs text-white/35">
          This address will be used for billing and verification purposes.
        </p>
      </div>
    </Form>
  );
}
