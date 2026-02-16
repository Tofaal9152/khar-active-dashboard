export type Discount = {
  discount_type?: "percentage" | "fixed";
  amount?: number;
};

export function formatDiscountLabel(d?: Discount): string {
  if (!d?.discount_type || !Number.isFinite(d.amount)) return "";
  const amt = Number(d.amount);

  if (d.discount_type === "percentage") return `${amt}%`;
  return `৳${amt}`;
}

export function calcDiscountAmount(price: number, d?: Discount): number {
  const p = Number(price || 0);
  if (!d?.discount_type || !Number.isFinite(d.amount)) return 0;

  const amt = Number(d.amount);

  if (d.discount_type === "percentage") {
    const value = (p * amt) / 100;
    return Math.max(0, Math.round(value * 100) / 100); // add 2 digits AFTER DECIMAL
  }

  // fixed
  return Math.max(0, Math.min(p, amt));
}
