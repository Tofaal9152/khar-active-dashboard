import DateFormat from "@/utils/DateFormat";

function RowLine({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-black/5 last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right break-words max-w-[60%]">
        {value ?? "—"}
      </span>
    </div>
  );
}

function BookingDetailsView({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold mb-2">Customer</div>
          <RowLine label="Name" value={data.full_name} />
          <RowLine label="Phone" value={data.phone_number} />
          <RowLine label="Email" value={data.email} />
          <RowLine label="DOB" value={data.dob} />
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold mb-2">Session</div>
          <RowLine label="Session Type" value={data.session_type} />
          <RowLine label="Date" value={data.date} />
          <RowLine label="Selected Slot" value={data.selected_slot} />
          <RowLine
            label="Session ID"
            value={data.selected_session?.id || "—"}
          />
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold mb-2">Slot Capacity</div>
          <RowLine
            label="Max Capacity"
            value={data.selected_session?.slot?.max_capacity ?? "—"}
          />
          <RowLine
            label="Enrolled Count"
            value={data.selected_session?.slot?.enrolled_count ?? "—"}
          />
          <RowLine
            label="Slot Title"
            value={data.selected_session?.slot?.title ?? "—"}
          />
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold mb-2">Payment</div>
          <RowLine label="Total Price" value={`৳${data.total_price}`} />
          <RowLine label="Discount" value={`৳${data.discount_amount}`} />
          <RowLine label="Paid Amount" value={`৳${data.paid_amount}`} />
          <RowLine label="Status" value={data.payment_status} />
          <RowLine label="Invoice No" value={data.invoice_number} />
          <RowLine label="Transaction ID" value={data.transaction_id} />
        </div>
      </div>

      <div className="rounded-lg border border-black/10 bg-white p-4">
        <RowLine label="Created At" value={DateFormat(data.created_at)} />
        <RowLine label="Updated At" value={DateFormat(data.updated_at)} />
      </div>
    </div>
  );
}
export default BookingDetailsView;
