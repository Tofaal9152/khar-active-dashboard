"use client";

import { useForm } from "@tanstack/react-form";
import { Check, Plus, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 1. Validation Schema
const packageSchema = z.object({
  photo: z.instanceof(File, { message: "Image is required" }).optional(),
  name: z.string().min(3, "Name is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  description: z.string().min(10, "Description is too short"),
  features: z.array(z.string()).min(1, "Add at least one feature"),
});

export default function CreatePackagePage() {
  // Local state for the "Add Feature" input
  const [tempFeature, setTempFeature] = useState("");

  const form = useForm({
    defaultValues: {
      photo: undefined,
      name: "",
      price: 0,
      description: "",
      features: [] as string[],
    } as any,
    validators: {
      onSubmit: packageSchema as any,
    },
    onSubmit: async ({ value }) => {
      console.log("Package Created:", value);
      toast.success("Package created successfully!");
    },
  });

  return (
    <form
      id="create-package-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* --- Photo Upload --- */}
      <form.Field name="photo">
        {(field) => (
          <div className="flex flex-col gap-2">
            <FieldLabel>Package Image</FieldLabel>
            <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer overflow-hidden group">
              {field.state.value instanceof File ? (
                <>
                  <img
                    src={URL.createObjectURL(field.state.value)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <div className="p-3 bg-white rounded-full shadow-sm mb-2">
                    <Upload className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-sm font-semibold">Click to upload image</p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF (max. 2MB)
                  </p>
                </div>
              )}
              <Input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer h-full"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) field.handleChange(file);
                }}
              />
            </div>
          </div>
        )}
      </form.Field>

      {/* Name */}
      <form.Field name="name">
        {(field) => (
          <Field>
            <FieldLabel>Package Name</FieldLabel>
            <Input
              placeholder="e.g. Elite Striking Class"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.isTouched && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      </form.Field>

      {/* Price & Billing */}
      <div className="grid grid-cols-1 gap-4">
        <form.Field name="price">
          {(field) => (
            <Field>
              <FieldLabel>Price ($)</FieldLabel>
              <Input
                type="number"
                placeholder="99.00"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              {field.state.meta.isTouched && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
      </div>

      {/* Description */}
      <form.Field name="description">
        {(field) => (
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              placeholder="Describe what this package includes..."
              className="resize-none h-24"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.isTouched && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      </form.Field>

      {/* Features Array Field */}
      <form.Field name="features">
        {(field) => (
          <div className="space-y-3 pt-2">
            <FieldLabel>What&apos;s Included? (Features)</FieldLabel>

            {/* Input to Add Feature */}
            <div className="flex gap-2">
              <Input
                value={tempFeature}
                onChange={(e) => setTempFeature(e.target.value)}
                placeholder="e.g. Unlimited Gym Access"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (tempFeature.trim()) {
                      field.handleChange([...field.state.value, tempFeature]);
                      setTempFeature("");
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  if (tempFeature.trim()) {
                    field.handleChange([...field.state.value, tempFeature]);
                    setTempFeature("");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* List of Added Features */}
            <div className="space-y-2">
              {field.state.value.map((feat: any, i: any) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{feat}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newFeatures = field.state.value.filter(
                        (_: any, idx: any) => idx !== i,
                      );
                      field.handleChange(newFeatures);
                    }}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {field.state.value.length === 0 && (
                <p className="text-xs text-gray-400 italic">
                  No features added yet.
                </p>
              )}
            </div>
            {field.state.meta.isTouched && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </div>
        )}
      </form.Field>

      {/* submit button */}
      <div className="flex items-center justify-end">
        <Button type="submit" className="mt-4">
          Create Package
        </Button>
      </div>
    </form>
  );
}
