export type CreateMasterDataTableTypes = {
  id: string;
  name: string;
  date: string;
};
export type ItemRow = {
  id: string;
  sl: number;
  productId: string;
  productName: string;
  group: string;
  size: string;
  brand: string;
  unit: string;
  purchasePrice: number;
  qty: number;
};

export type ChargeRow =
  | { id: string; label: string; type: "fixed"; value: number }
  | { id: string; label: string; type: "percent"; value: number };

export type Totals = {
  subtotal: number;
  totalOverhead: number;
  total: number;
  unitOverhead: number;
  total_direct_costs: number;
  total_vat: number;
};

export const fmt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export function computeTotals(items: ItemRow[], charges: ChargeRow[]): Totals {
  const subtotal = items.reduce((sum, r) => sum + r.purchasePrice * r.qty, 0);

  const fixed = charges
    .filter((c) => c.type === "fixed")
    .reduce((s, c) => s + c.value, 0);

  const percentBase = subtotal;
  const percent = charges
    .filter((c) => c.type === "percent")
    .reduce((s, c) => s + (percentBase * c.value) / 100, 0);

  const totalOverhead = fixed + percent;
  const total = subtotal + totalOverhead;

  const totalQty = items.reduce((s, r) => s + r.qty, 0);
  const unitOverhead = totalQty ? totalOverhead / totalQty : 0;

  return {
    subtotal,
    totalOverhead,
    total,
    unitOverhead,
    total_direct_costs: fixed,
    total_vat: percent,
  };
}
