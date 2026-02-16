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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { uploadSingleFile } from "@/services/uploadFile.service";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Camera, X } from "lucide-react";
import { useState } from "react";
import {
  createPackage,
  GET_ALL_PACKAGE_KEY,
  updatePackage,
} from "../services/package.service";

type Props = {
  mode?: "create" | "edit";
  data?: any;
};

export default function PackageForm({ mode = "create", data }: Props) {
  const [submitError, setSubmitError] = useState("");
  const [imgPreview, setImgPreview] = useState<string>("");

  const imgUploadMutation = useMutation({
    mutationFn: uploadSingleFile,
  });

  // create/update mutation
  const packageMutation = useMutationHandler({
    mutationFn: (payload: any) =>
      mode === "edit"
        ? updatePackage(payload, data.id)
        : createPackage(payload),
    invalidateKeys: [[GET_ALL_PACKAGE_KEY]],
  });

  const form = useForm({
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      price: data?.price || "",
      img_url: data?.img_url || "",
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitError("");
        await packageMutation.mutateAsync(value);
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
          {/* IMAGE */}
          <Card>
            <CardHeader>
              <CardTitle>Package Image</CardTitle>
            </CardHeader>
            <CardContent>
              <form.Field name="img_url">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  const previewSrc = imgPreview || (field.state.value as any);

                  return (
                    <Field data-invalid={isInvalid} className="space-y-3">
                      <Label>Image *</Label>

                      <label className="group relative w-full rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden bg-white hover:bg-gray-50 cursor-pointer  aspect-video">
                        {previewSrc ? (
                          <img
                            src={previewSrc}
                            alt="Package"
                            className="w-full h-full object-cover "
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-gray-400 h-40 justify-center">
                            <Camera className="w-8 h-8 mb-2" />
                            <span className="text-xs uppercase font-bold">
                              Upload package image
                            </span>
                          </div>
                        )}

                        {previewSrc && !imgUploadMutation.isPending && (
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setImgPreview("");
                              field.handleChange("");
                            }}
                            aria-label="Remove image"
                          >
                            <X size={16} />
                          </button>
                        )}

                        {imgUploadMutation.isPending && (
                          <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs font-semibold text-gray-700">
                            Uploading...
                          </div>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            e.target.value = "";
                            if (!file) return;

                            setImgPreview(URL.createObjectURL(file));

                            imgUploadMutation.mutate(file, {
                              onSuccess: (url) => {
                                field.handleChange(url);
                                setImgPreview(url);
                              },
                              onError: () => {
                                field.handleChange("");
                                setImgPreview("");
                              },
                            });
                          }}
                        />
                      </label>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </CardContent>
          </Card>

          {/* BASIC INFO */}
          <Card>
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form.Field name="title">
                {(field) => (
                  <Field>
                    <FieldLabel>Title *</FieldLabel>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter package title"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              <form.Field name="description">
                {(field) => (
                  <Field>
                    <FieldLabel>Description *</FieldLabel>
                    <Textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write package description..."
                      className="min-h-[120px]"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              <form.Field name="price">
                {(field) => (
                  <Field>
                    <FieldLabel>Price *</FieldLabel>
                    <Input
                      type="number"
                      step="0.01"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter package price in BDT"
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
              disabled={
                form.state.isSubmitting ||
                packageMutation.isPending ||
                imgUploadMutation.isPending
              }
            >
              {imgUploadMutation.isPending
                ? "Uploading image..."
                : form.state.isSubmitting || packageMutation.isPending
                  ? mode === "edit"
                    ? "Updating..."
                    : "Creating..."
                  : mode === "edit"
                    ? "Update Package"
                    : "Create Package"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
