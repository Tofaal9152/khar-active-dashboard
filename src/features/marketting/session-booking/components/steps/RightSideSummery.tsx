import { DateOnlyFormat } from "@/utils/DateFormat";
import RowEdit from "../RowEdit";

const RightSideSummery = ({
  location,
  sessionType,
  date,
  time,
  price,
  discount,
  discountLabel,
  net,
}: {
  location: string;
  sessionType: string | undefined;
  date: Date | undefined;
  time: string | undefined;
  price: number;
  discount: number;
  discountLabel?: string;
  net: number;
}) => {
  const afterDiscountTotal = Math.max(0, price - (discount || 0)); // same as net

  return (
    <div className="p-8 bg-[#FAFAFA] space-y-5">
      <h3 className="text-xl font-bold text-[#111111]">Booking summary</h3>

      <RowEdit label="Location" value={location} />
      <RowEdit label="Session Type" value={sessionType || "—"} />
      <RowEdit label="Date" value={DateOnlyFormat(date as any)} />
      <RowEdit label="Time" value={time || "—"} />

      <div className="pt-4 border-t space-y-2">
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-semibold">৳{price} BDT</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span>Discount {discountLabel ? `(${discountLabel})` : ""}</span>
            <span>-৳{discount} BDT</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Net</span>
          <span>৳{net} BDT</span>
        </div>
      </div>
    </div>
  );
};

export default RightSideSummery;
