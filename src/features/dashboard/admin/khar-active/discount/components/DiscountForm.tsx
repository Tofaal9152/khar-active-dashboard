"use client";

import { SmartForm, SmartFormField } from "@/components/shared/smart-form";
import {
  ALL_DISCOUNT_KEY,
  createDiscount,
  discountSchema,
} from "../services/discount.service";

export default function DiscountForm({
  mode = "create",
  data,
}: {
  mode?: any;
  data?: any;
}) {
  return (
    <SmartForm
      schema={discountSchema}
      mutationFn={createDiscount}
      queryKey={[ALL_DISCOUNT_KEY]}
      mode={mode}
      defaultValues={{
        discountType: data?.discount_type ?? "percentage",
        amount: data?.amount ?? 0,
      }}
    >
      {(form) => (
        <div className="space-y-4">
          <div>
            <SmartFormField
              form={form}
              name="discountType"
              type="shadcnSelect"
              label="Discount Type"
              placeholder="Select type"
              options={[
                { label: "Percentage", value: "percentage" },
                { label: "Fixed", value: "fixed" },
              ]}
            />

            <SmartFormField
              form={form}
              name="amount"
              type="number"
              label="Amount"
              placeholder={
                form.watch("discountType") === "percentage"
                  ? "Example: 10 (means 10%)"
                  : "Example: 10 (fixed amount)"
              }
            />
            {/* info */}
            <p className="text-xs text-gray-400 mt-1">
              {form.watch("discountType") === "percentage"
                ? "Enter the discount percentage (e.g., 10 for 10%)."
                : "Enter the fixed discount amount (e.g., 10 for 10 BDT)."}
            </p>
          </div>
        </div>
      )}
    </SmartForm>
  );
}
