"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getAllDiscount } from "../services/discount.service";
import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import { AppDialog } from "@/components/shared/AppDialog";
import DiscountForm from "./DiscountForm";
import { Button } from "@/components/ui/button";

export default function DiscountList() {
  const { data: discountData, isLoading, error } = getAllDiscount();
  const discount = discountData?.data;

  return (
    <Card className="bg-white border border-gray-200 rounded-xl text-gray-900">
      <CardContent className="p-6">
        <AsyncStateWrapper loading={isLoading} error={error?.message}>
          {discount && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600">Discount Type</span>
                <span className="text-sm font-medium capitalize">
                  {discount.discount_type}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600">Amount</span>
                <span className="text-sm font-medium">
                  {discount.discount_type === "percentage"
                    ? `${discount.amount}%`
                    : `${discount.amount} BDT`}
                </span>
              </div>

              <AppDialog
                trigger={
                  <Button className={"bg-blue-600 text-white hover:bg-blue-700"}>
                    Edit Discount
                  </Button>
                }
                title="Edit Discount"
                description="Modify the discount details below."
                size="lg"
              >
                <DiscountForm data={discount} mode="edit" />
              </AppDialog>
            </div>
          )}
        </AsyncStateWrapper>
      </CardContent>
    </Card>
  );
}
