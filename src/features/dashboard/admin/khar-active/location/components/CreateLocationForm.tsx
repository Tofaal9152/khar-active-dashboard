"use client";

import { ALL_LOCATION_KEY, createLocation, locationSchema } from "../services/location.service";


import { SmartForm } from "@/components/shared/smart-form";
import LocationFieldArrays from "./LocationFieldArrays";



export default function CreateLocationForm() {
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

    return createLocation(normalized);
  };

  return (
    <SmartForm
      schema={locationSchema}
      mutationFn={handleSubmit}
      queryKey={[ALL_LOCATION_KEY]}
      mode="create"
      submitText="Create Location"
      defaultValues={{
        title: "",
        address: "",
        available_sessions: [{ title: "", price: 0 }],
        available_slots: [{ title: "", max_capacity: 1 }],
      }}
    >
      {(form) => <LocationFieldArrays form={form} />}
    </SmartForm>
  );
}
