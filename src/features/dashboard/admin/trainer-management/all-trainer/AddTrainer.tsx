"use client";

import { useForm } from "@tanstack/react-form";
import { Calendar, Clock, Upload } from "lucide-react"; // Icons
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// --- Constants ---
const DAYS = ["M", "T", "W", "Th", "F", "Sa", "Su"];
const FIGHTING_STYLES = [
  "Boxing",
  "MMA",
  "Muay Thai",
  "BJJ",
  "Karate",
  "Wrestling",
];

// ১. ভ্যালিডেশন স্কিমা (React Native কোডের সব ফিল্ড সহ)
const trainerSchema = z.object({
  fullName: z.string().min(3, "Name required"), // Basic info kept
  email: z.string().email("Invalid email address"), // Basic info kept
  photo: z.instanceof(File).optional().or(z.string()).optional(), // Photo handling
  fightingStyle: z.string().min(1, "Select a style"),
  experience: z.coerce.number().min(0),
  hourlyRate: z.coerce.number().min(1),
  bio: z.string().optional(),
  selectedDays: z.array(z.string()).min(1, "Select at least one day"), // Days Array
  startTime: z.string().min(1, "Start time required"), // Time String
  endTime: z.string().min(1, "End time required"), // Time String
});

export function AddTrainerForm() {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      photo: undefined,
      fightingStyle: "",
      experience: 0,
      hourlyRate: 0,
      bio: "",
      selectedDays: [] as string[], // Array for days
      startTime: "08:00", // Default string time
      endTime: "20:00",
    } as any,
    validators: {
      onSubmit: trainerSchema as any,
    },
    onSubmit: async ({ value }) => {
      console.log("FINAL PAYLOAD:", value);
      toast.success("Trainer Profile Activated!");
    },
  });

  return (
    <form
      id="add-trainer-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* --- 1. Photo Upload Section --- */}
      <form.Field name="photo">
        {(field) => (
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition">
              {field.state.value instanceof File ? (
                <img
                  src={URL.createObjectURL(field.state.value)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500 font-semibold">
                    ADD PHOTO
                  </span>
                </div>
              )}
              <Input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) field.handleChange(file);
                }}
              />
            </div>
            <p className="text-xs text-gray-500">
              Professional headshot recommended
            </p>
          </div>
        )}
      </form.Field>

      {/* --- 2. Professional Details --- */}
      <FieldGroup>
        {/* Full Name */}
        <form.Field name="fullName">
          {(field) => (
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Md Tofaal Ahmed"
              />
            </Field>
          )}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel>Email Address</FieldLabel>
              <Input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. example@example.com"
              />
            </Field>
          )}
        </form.Field>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Fighting Style (Dropdown) */}
          <form.Field name="fightingStyle">
            {(field) => (
              <Field>
                <FieldLabel>Fighting Style</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIGHTING_STYLES.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>

          {/* Experience */}
          <form.Field name="experience">
            {(field) => (
              <Field>
                <FieldLabel>Experience (Yrs)</FieldLabel>
                <Input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </Field>
            )}
          </form.Field>

          {/* Hourly Rate */}
          <form.Field name="hourlyRate">
            {(field) => (
              <Field>
                <FieldLabel>Hourly Rate ($)</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">
                    $
                  </span>
                  <Input
                    type="number"
                    className="pl-7"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              </Field>
            )}
          </form.Field>
        </div>

        {/* Bio */}
        <form.Field name="bio">
          {(field) => (
            <Field>
              <FieldLabel>Bio / Achievements</FieldLabel>
              <Textarea
                className="resize-none min-h-[80px]"
                placeholder="Ex: Golden Gloves Champion..."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      {/* --- 3. Availability Section (Like React Native) --- */}
      <div className="pt-4 border-t">
        <h3 className="text-sm font-bold text-gray-900 mb-4 tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4" /> AVAILABILITY
        </h3>

        {/* Days Selection */}
        <form.Field name="selectedDays">
          {(field) => (
            <div className="mb-6">
              <Label className="text-xs font-bold text-gray-600 mb-3 block">
                AVAILABLE DAYS
              </Label>
              <div className="flex flex-wrap gap-3">
                {DAYS.map((day, i) => {
                  const dayCode = day + i; // Logic from your RN code
                  const isActive = field.state.value.includes(dayCode);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const newDays = isActive
                          ? field.state.value.filter((d: any) => d !== dayCode)
                          : [...field.state.value, dayCode];
                        field.handleChange(newDays);
                      }}
                      className={`
                            w-10 h-10 rounded-full text-xs font-bold transition-all border
                            ${
                              isActive
                                ? "bg-red-600 text-white border-red-600 shadow-md transform scale-105"
                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                            }
                          `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-600 text-xs mt-2 font-medium">
                  Select at least one day
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Time Selection */}
        <div className="grid grid-cols-2 gap-4">
          <form.Field name="startTime">
            {(field) => (
              <div>
                <Label className="text-xs font-bold text-gray-600 mb-2 block">
                  START TIME
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  <Input
                    type="time"
                    className="pl-9"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="endTime">
            {(field) => (
              <div>
                <Label className="text-xs font-bold text-gray-600 mb-2 block">
                  END TIME
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  <Input
                    type="time"
                    className="pl-9"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              </div>
            )}
          </form.Field>
        </div>
      </div>
      <div className="flex ">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              form="add-trainer-form"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold "
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? "SAVING..." : "Add Trainer"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
