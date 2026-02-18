"use client";

import { useFieldArray } from "react-hook-form";
import { SmartFormField, FormSection } from "@/components/shared/smart-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface LocationFieldArraysProps {
  form: UseFormReturn<any>;
}

export default function LocationFieldArrays({ form }: LocationFieldArraysProps) {
  const sessions = useFieldArray({
    control: form.control,
    name: "available_sessions",
  });

  const slots = useFieldArray({
    control: form.control,
    name: "available_slots",
  });

  return (
    <div className="space-y-6">
      {/* Basic */}
      <FormSection title="Location Info" description="Basic location details">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SmartFormField
            form={form}
            name="title"
            type="text"
            label="Title"
            placeholder="Uttara"
          />

          <SmartFormField
            form={form}
            name="address"
            type="text"
            label="Address"
            placeholder="123 Main St, Cityville, NY 10001"
          />
        </div>
      </FormSection>

      {/* Sessions */}
      <FormSection title="Available Sessions" description="Session types & price">
        <div className="space-y-3">
          {sessions.fields.map((f, i) => (
            <Card key={f.id} className="border gray-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <SmartFormField
                    form={form}
                    name={`available_sessions.${i}.title`}
                    type="text"
                    label={`Session Title #${i + 1}`}
                    placeholder="Self Defence"
                    className="md:col-span-2"
                  />
                  <SmartFormField
                    form={form}
                    name={`available_sessions.${i}.price`}
                    type="number"
                    label="Price"
                    placeholder="799"
                  />
                </div>

                <div className="mt-3 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => sessions.remove(i)}
                    disabled={sessions.fields.length <= 1}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            onClick={() => sessions.append({ title: "", price: 0 })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Session
          </Button>
        </div>
      </FormSection>

      {/* Slots */}
      <FormSection title="Available Slots" description="Time slots & capacity">
        <div className="space-y-3">
          {slots.fields.map((f, i) => (
            <Card key={f.id} className="border gray-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <SmartFormField
                    form={form}
                    name={`available_slots.${i}.title`}
                    type="text"
                    label={`Slot Title #${i + 1}`}
                    placeholder="06:00 AM - 07:00 AM"
                    className="md:col-span-2"
                  />
                  <SmartFormField
                    form={form}
                    name={`available_slots.${i}.max_capacity`}
                    type="number"
                    label="Max Capacity"
                    placeholder="15"
                  />
                </div>

                <div className="mt-3 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => slots.remove(i)}
                    disabled={slots.fields.length <= 1}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            onClick={() => slots.append({ title: "", max_capacity: 1 })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Slot
          </Button>
        </div>
      </FormSection>
    </div>
  );
}
