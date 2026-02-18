"use client";

import DateFormat from "@/utils/DateFormat";

function RowLine({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-white/10 last:border-b-0">
      <span className="text-sm text-white/60">{label}</span>
      <span className="text-sm font-medium text-right break-words max-w-[60%] text-white">
        {value ?? "—"}
      </span>
    </div>
  );
}

export default function TrainerDetailsView({ data }: { data: any }) {
  const fullName = `${data?.first_name ?? ""} ${data?.last_name ?? ""}`.trim();

  return (
    <div className="space-y-3 text-white">
      <div className="rounded-lg border border-white/10 bg-[#121212] p-4">
        <div className="text-sm font-semibold mb-2 text-white">Trainer</div>

        <RowLine label="Full Name" value={fullName || "—"} />
        <RowLine label="Email" value={data?.email} />
        <RowLine label="Phone" value={data?.phone_number} />
        <RowLine label="Trainer ID" value={data?.id} />
      </div>

      <div className="rounded-lg border border-white/10 bg-[#121212] p-4">
        <div className="text-sm font-semibold mb-2 text-white">Timestamps</div>
        <RowLine label="Created At" value={DateFormat(data?.created_at)} />
        <RowLine label="Updated At" value={DateFormat(data?.updated_at)} />
      </div>
    </div>
  );
}
