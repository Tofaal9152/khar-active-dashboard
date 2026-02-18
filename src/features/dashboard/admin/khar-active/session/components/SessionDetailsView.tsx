"use client";

import DateFormat from "@/utils/DateFormat";
import RowLine from "./RowLine";

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: string }) {
  const cls =
    variant === "success"
      ? "bg-green-100 text-green-800 border-green-300"
      : variant === "danger"
      ? "bg-red-100 text-red-800 border-red-300"
      : variant === "warning"
      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
      : "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold border ${cls}`}
    >
      {children}
    </span>
  );
}

export default function SessionDetailsView({ data }: { data: any }) {
  const max = Number(data?.slot?.max_capacity ?? 0);
  const slotEnrolled = Number(data?.slot?.enrolled_count ?? 0);
  const full = max > 0 && slotEnrolled >= max;

  const trainer = data?.trainer;

  return (
    <div className="space-y-4 text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Session Info */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-semibold mb-2 text-gray-800">Session</div>

          <RowLine label="Session ID" value={data?.id} />
          <RowLine label="Date" value={data?.date} />
          <RowLine label="Enrolled Count" value={data?.enrolled_count ?? 0} />

          <div className="flex items-center justify-between gap-4 py-2">
            <span className="text-sm text-gray-600">Status</span>
            <Badge variant={full ? "danger" : "success"}>
              {full ? "Full" : "Available"}
            </Badge>
          </div>
        </div>

        {/* Slot Info */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-semibold mb-2 text-gray-800">Slot</div>

          <RowLine label="Title" value={data?.slot?.title ?? "—"} />
          <RowLine
            label="Max Capacity"
            value={data?.slot?.max_capacity ?? "—"}
          />
          <RowLine
            label="Enrolled (Slot)"
            value={data?.slot?.enrolled_count ?? 0}
          />

          {max > 0 && (
            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-gray-600">Remaining</span>
              <span className="text-sm font-medium text-gray-800">
                {Math.max(max - slotEnrolled, 0)}
              </span>
            </div>
          )}
        </div>

        {/* Assignment */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-semibold mb-2 text-gray-800">
            Assignment
          </div>

          {trainer ? (
            <>
              <RowLine
                label="Trainer"
                value={
                  `${trainer.first_name || ""} ${
                    trainer.last_name || ""
                  }`.trim() || trainer.email
                }
              />
              <RowLine label="Trainer Email" value={trainer.email} />
              <RowLine label="Trainer Phone" value={trainer.phone_number} />
            </>
          ) : (
            <RowLine label="Trainer" value="Unassigned" />
          )}

          <RowLine
            label="Training Location"
            value={
              data?.training_location?.title
                ? `${data.training_location.title} — ${
                    data.training_location.address || ""
                  }`.trim()
                : data?.training_location ?? "—"
            }
          />
        </div>

        {/* Timestamps */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-semibold mb-2 text-gray-800">
            Timestamps
          </div>

          <RowLine label="Created At" value={DateFormat(data?.created_at)} />
          <RowLine label="Updated At" value={DateFormat(data?.updated_at)} />
        </div>
      </div>
    </div>
  );
}
