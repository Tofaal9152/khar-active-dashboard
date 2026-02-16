"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Camera,
  Ruler,
  Weight,
  User,
  Target,
  Mail,
  Activity,
  // New icons added here
  Flame,
  Shield,
  Trophy,
  Dumbbell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const GENDER_OPTIONS = ["Male", "Female", "Non-Binary", "Prefer not to say"];
const GOAL_OPTIONS = ["WEIGHT LOSS", "SELF DEFENSE", "PRO COMP", "FITNESS"];

// Map labels to specific icons
const GOAL_ICONS: Record<string, React.ElementType> = {
  "WEIGHT LOSS": Flame,
  "SELF DEFENSE": Shield,
  "PRO COMP": Trophy,
  FITNESS: Dumbbell,
};

const fighterSchema = z.object({
  photo: z.instanceof(File).optional().or(z.string().optional()),
  fullName: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  height: z.coerce.number().min(50, "Invalid height (cm)"),
  weight: z.coerce.number().min(20, "Invalid weight (kg)"),
  age: z.coerce.number().min(10, "Too young").max(100, "Invalid age"),
  gender: z.string().min(1, "Select a gender"),
  primaryGoal: z.string().min(1, "Select a primary goal"),
});

export default function AddTrainee() {
  const form = useForm({
    defaultValues: {
      photo: undefined,
      fullName: "",
      email: "",
      height: 0,
      weight: 0,
      age: 0,
      gender: "",
      primaryGoal: "",
    } as any,
    validators: {
      onSubmit: fighterSchema as any,
    },
    onSubmit: async ({ value }) => {
      console.log("--- PAYLOAD ---", value);
      toast.success("Profile Created!");
    },
  });

  return (
    <form
      id="fighter-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* --- Photo --- */}
      <form.Field name="photo">
        {(field) => (
          <div className="flex flex-col items-center justify-center gap-3 mb-6">
            <div className="relative group w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
              {field.state.value instanceof File ? (
                <img
                  src={URL.createObjectURL(field.state.value)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400 group-hover:text-red-600 transition" />
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
            <span className="text-xs font-bold text-gray-500 uppercase">
              {field.state.value ? "Change Photo" : "Upload Photo"}
            </span>
          </div>
        )}
      </form.Field>

      {/* --- Name & Email --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field name="fullName">
          {(field) => (
            <Field>
              <FieldLabel className="text-xs uppercase text-gray-500">
                Full Name
              </FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Your Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
              {field.state.meta.isTouched && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel className="text-xs uppercase text-gray-500">
                Email
              </FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="you@example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
              {field.state.meta.isTouched && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
      </div>

      {/* --- Stats --- */}
      <div className="grid grid-cols-3 gap-4">
        <form.Field name="height">
          {(field) => (
            <Field>
              <FieldLabel className="text-xs uppercase text-gray-500">
                Height (cm)
              </FieldLabel>
              <div className="relative">
                <Ruler className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  className="pl-9 text-center font-bold"
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </div>
            </Field>
          )}
        </form.Field>

        <form.Field name="weight">
          {(field) => (
            <Field>
              <FieldLabel className="text-xs uppercase text-gray-500">
                Weight (kg)
              </FieldLabel>
              <div className="relative">
                <Weight className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  className="pl-9 text-center font-bold"
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </div>
            </Field>
          )}
        </form.Field>

        <form.Field name="age">
          {(field) => (
            <Field>
              <FieldLabel className="text-xs uppercase text-gray-500">
                Age
              </FieldLabel>
              <div className="relative">
                <Activity className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  className="pl-9 text-center font-bold"
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </div>
            </Field>
          )}
        </form.Field>
      </div>

      {/* --- Gender --- */}
      <form.Field name="gender">
        {(field) => (
          <Field>
            <FieldLabel className="text-xs uppercase text-gray-500">
              Gender
            </FieldLabel>
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.state.meta.isTouched && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      </form.Field>

      {/* --- Goal (Updated with Icons) --- */}
      <form.Field name="primaryGoal">
        {(field) => (
          <div className="space-y-3">
            <Label className="text-xs uppercase text-gray-500 font-bold flex items-center gap-2">
              <Target className="w-4 h-4" /> Primary Goal
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {GOAL_OPTIONS.map((goal) => {
                const Icon = GOAL_ICONS[goal];
                const isSelected = field.state.value === goal;

                return (
                  <div
                    key={goal}
                    onClick={() => field.handleChange(goal)}
                    className={`cursor-pointer py-4 px-2 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? "bg-red-600 border-red-600 text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`w-6 h-6 ${
                          isSelected ? "text-white" : "text-gray-400"
                        }`}
                      />
                    )}
                    <span className="text-xs font-bold tracking-wider">
                      {goal}
                    </span>
                  </div>
                );
              })}
            </div>
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <p className="text-red-600 text-xs font-bold text-center">
                  Select a goal
                </p>
              )}
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            form="fighter-form"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-6 tracking-widest"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? "PROCESSING..." : "Create Trainee"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
