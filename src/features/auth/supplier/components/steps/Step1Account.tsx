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

export default function Step1Account() {
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
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>EMAIL ADDRESS</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter your email" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password1"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>PASSWORD</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} type="password" placeholder="Create password" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>CONFIRM PASSWORD</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} type="password" placeholder="Confirm password" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
