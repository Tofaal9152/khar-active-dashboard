"use client";

import { useMemo } from "react";
import { locationSchema } from "../services/location.service";
import { updateLocation } from "../services/location.service";

import { SmartForm } from "@/components/shared/smart-form";
import { Card, CardContent } from "@/components/ui/card";
import { ALL_LOCATION_KEY } from "../services/location.service";
import LocationFieldArrays from "./LocationFieldArrays";

export default function UpdateLocationForm({ data }: { data: any }) {
  const id = data?.id;

  const defaultValues = useMemo(() => {
    if (!data) return null;

    return {
      title: data?.title ?? "",
      address: data?.address ?? "",
      available_sessions: (data?.available_sessions || []).map((s: any) => ({
        title: s?.title ?? "",
        price: Number(s?.price || 0),
      })),
      available_slots: (data?.available_slots || []).map((sl: any) => ({
        title: sl?.title ?? "",
        max_capacity: Number(sl?.max_capacity || 1),
      })),
    };
  }, [data]);

  const handleSubmit = (payload: any) => {
    const normalized = {
      ...payload,
      available_sessions: (payload.available_sessions || []).map((s: any) => ({
        ...s,
        price: Number(s.price),
      })),
      available_slots: (payload.available_slots || []).map((sl: any) => ({
        ...sl,
        max_capacity: Number(sl.max_capacity),
      })),
    };

    return updateLocation(id, normalized);
  };

  if (!id) {
    return (
      <Card>
        <CardContent className="p-6">Missing location id</CardContent>
      </Card>
    );
  }

  if (!defaultValues) {
    return (
      <Card>
        <CardContent className="p-6">No data found</CardContent>
      </Card>
    );
  }

  return (
    <SmartForm
      schema={locationSchema}
      mutationFn={handleSubmit}
      queryKey={[ALL_LOCATION_KEY]}
      mode="update"
      submitText="Update Location"
      defaultValues={defaultValues}
    >
      {(form) => <LocationFieldArrays form={form} />}
    </SmartForm>
  );
}
