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
import { Lock } from "lucide-react";

export default function Step4Bank() {
  const { form } = useMultiStepForm<SupplierRegisterPayload>();

  const inputCls =
    "h-12 rounded-xl border-white/10 bg-[#050c1a] text-white placeholder:text-white/35 focus-visible:ring-cyan-400/40";
  const labelCls =
    "text-[11px] font-medium tracking-[0.22em] text-white/50";

  return (
    <Form {...form}>
      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#050c1a] px-4 py-3 text-sm text-white/55">
          <Lock className="h-4 w-4 text-white/35" />
          <span>Your bank details are encrypted and securely stored.</span>
        </div>

        <FormField
          control={form.control}
          name="bank_name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>BANK NAME</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter bank name" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bank_account_holder_name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>ACCOUNT HOLDER NAME</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter account holder name" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bank_account_number"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>ACCOUNT NUMBER</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter account number" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bank_routing_number"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelCls}>ROUTING / SWIFT / IFSC CODE</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} placeholder="Enter routing, swift, or ifsc code" className={inputCls} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="pt-2 text-center text-xs text-white/35">
          You can update payout information later from the dashboard.
        </p>
      </div>
    </Form>
  );
}
