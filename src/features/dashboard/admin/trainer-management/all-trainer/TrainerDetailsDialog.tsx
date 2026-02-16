// components/TrainerDetails.tsx
import Image from "next/image";
import React from "react";

type Props = {
  data: {
    [key: string]: any;
  };
};

const FieldRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b last:border-b-0">
    <div className="text-sm font-medium text-muted-foreground">{label}</div>
    <div className="md:col-span-2 text-sm break-words">{value}</div>
  </div>
);

export default function TrainerDetails({ data }: Props) {
  const imgClass = "w-40 h-40 object-cover rounded border";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium mb-2">Profile Image</div>
          {data.profile_img_url ? (
            <div className="relative w-full h-64">
              <Image
          src={data.profile_img_url}
          alt="profile"
          className="object-contain"
          fill
              />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No profile image
            </div>
          )}
        </div>

        <div>
          <div className="text-sm font-medium mb-2">NID Image</div>
          {data.nid_img_url ? (
            <div className="relative w-full h-64">
              <Image
          src={data.nid_img_url}
          alt="nid"
          className="object-contain"
          fill
              />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No NID image</div>
          )}
        </div>
      </div>

      <div className="rounded border p-3">
        <FieldRow label="Name" value={data.name || "-"} />
        <FieldRow label="Phone" value={data.phone_number || "-"} />
        <FieldRow label="Email" value={data.email || "-"} />
        <FieldRow
          label="Age"
          value={typeof data.age === "number" ? data.age : "-"}
        />
        <FieldRow label="Gender" value={data.gender || "-"} />
        <FieldRow label="Address" value={data.address || "-"} />

        <FieldRow
          label="Training Types"
          value={
            Array.isArray(data.training_types) && data.training_types.length
              ? data.training_types.join(", ")
              : "-"
          }
        />
        <FieldRow
          label="Training Locations"
          value={
            Array.isArray(data.training_locations) &&
            data.training_locations.length
              ? data.training_locations.join(", ")
              : "-"
          }
        />
        <FieldRow
          label="Available Days"
          value={
            Array.isArray(data.availabile_days_in_week) &&
            data.availabile_days_in_week.length
              ? data.availabile_days_in_week.join(", ")
              : "-"
          }
        />

        <FieldRow label="Approved" value={data.is_approved ? "Yes" : "No"} />

        <FieldRow
          label="slots"
          value={
            Array.isArray(data.slots) && data.slots.length ? (
              <div className="space-y-2">
                {data.slots.map((slot: any, index: number) => (
                  <div
                    key={index}
                    className="p-2 border rounded bg-muted text-sm"
                  >
                    {slot.day_of_week}: {slot.start} - {slot.end}
                  </div>
                ))}
              </div>
            ) : (
              "-"
            )
          }
        />
      </div>
    </div>
  );
}
