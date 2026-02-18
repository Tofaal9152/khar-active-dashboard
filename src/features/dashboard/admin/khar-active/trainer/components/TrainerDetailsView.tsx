"use client";

interface RowLineProps {
  label: string;
  value: string | number | undefined;
}

function RowLine({ label, value }: RowLineProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-200 last:border-b-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-right wrap-break-word max-w-[60%] text-gray-900">
        {value ?? "—"}
      </span>
    </div>
  );
}

interface TrainerDetailsViewProps {
  data: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    id?: string;
    created_at?: string;
    updated_at?: string;
  };
}

export default function TrainerDetailsView({ data }: TrainerDetailsViewProps) {
  const fullName = `${data?.first_name ?? ""} ${data?.last_name ?? ""}`.trim();

  return (
    <div className="space-y-3 text-gray-900">
      <div className="rounded-lg border border-gray-300 bg-white p-4">
        <div className="text-sm font-semibold mb-2 text-gray-900">Trainer</div>

        <RowLine label="Full Name" value={fullName || "—"} />
        <RowLine label="Email" value={data?.email} />
        <RowLine label="Phone" value={data?.phone_number} />
        <RowLine label="Trainer ID" value={data?.id} />
      </div>
    </div>
  );
}
