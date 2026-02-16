"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

import { useMutationHandler } from "@/hooks/useMutationHandler";
import { getPackageList } from "../services/package.service";
import {
  createSyllabus,
  GET_ALL_SYLLABUS_KEY,
  syllabusSchema,
  updateSyllabus,
} from "../services/syllabus.service";

type Props = {
  mode?: "create" | "edit";
  data?: any; // { id, package, day, description }
};

export default function CreateSyllabuses({ mode = "create", data }: Props) {
  const [submitError, setSubmitError] = useState("");

  // package dropdown data
  const { data: packageData, isLoading: pkgLoading } = getPackageList();

  const syllabusMutation = useMutationHandler({
    mutationFn: (payload: any) =>
      mode === "edit"
        ? updateSyllabus(payload, data.id)
        : createSyllabus(payload),
    invalidateKeys: [[GET_ALL_SYLLABUS_KEY]],
  });

  const form = useForm({
    defaultValues: {
      package: data?.package || "",
      day: data?.day || "",
      description: data?.description || "",
    },
    validators: {
      onSubmit: syllabusSchema as any,
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitError("");
        await syllabusMutation.mutateAsync(value as any);

        toast.success(
          mode === "edit"
            ? "Syllabus updated successfully!"
            : "Syllabus created successfully!",
        );

        if (mode === "create") form.reset();
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error?.message ||
          "Something went wrong";
        setSubmitError(message);
      }
    },
  });

  return (
    <div className="bg-gray-50/50 md:py-6 py-4 md:px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="space-y-6">
          {/* BASIC INFO */}
          <Card>
            <CardHeader>
              <CardTitle>Syllabus Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* PACKAGE */}
              <form.Field name="package">
                {(field) => (
                  <Field>
                    <FieldLabel>Select Package *</FieldLabel>

                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue
                          placeholder={
                            pkgLoading ? "Loading..." : "Choose Package"
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {(packageData || []).map((p: any) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* DAY */}
              <form.Field name="day">
                {(field) => (
                  <Field>
                    <FieldLabel>Day *</FieldLabel>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Day 3"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* DESCRIPTION */}
              <form.Field name="description">
                {(field) => (
                  <Field>
                    <FieldLabel>Description *</FieldLabel>
                    <Textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write syllabus description..."
                      className="min-h-[120px]"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </CardContent>
          </Card>

          {/* ERROR */}
          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {/* SUBMIT */}
          <div className="sticky bottom-4 z-10">
            <Button
              type="submit"
              size="lg"
              className="w-full shadow-xl bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg"
              disabled={form.state.isSubmitting || syllabusMutation.isPending}
            >
              {form.state.isSubmitting || syllabusMutation.isPending
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                  ? "Update Syllabus"
                  : "Create Syllabus"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
