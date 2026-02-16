"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import {
  Camera,
  Check,
  MapPin,
  Plus,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  AVAILABLE_LOCATIONS,
  AVAILABLE_TRAINING_TYPES,
  DAYS_OPTIONS,
} from "./constant";
import MultiSelectWithOther from "./MultiSelectWithOther";

import { Switch } from "@/components/ui/switch";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import {
  GET_ALL_TRAINER_KEY,
  trainerSchema,
  updateTrainer,
  uploadSingleFile,
} from "../../../services/trainer.service";
import TrainingTypePicker from "./TrainingTypePicker";

export default function TrainerRegistration({
  mode = "create",
  data,
}: {
  mode?: "create" | "edit";
  data?: any; // TODO: type this properly
}) {
  const [submitError, setSubmitError] = useState<string>("");
  // tanstack api call make
  const updateTrainerMutation = useMutationHandler({
    mutationFn: (payload: any) => updateTrainer(payload, data.id, data.user), // TODO: replace "1" with actual trainer ID
    invalidateKeys: [[GET_ALL_TRAINER_KEY]],
  });

  const profileUploadMutation = useMutation({
    mutationFn: uploadSingleFile,
  });

  const nidUploadMutation = useMutation({
    mutationFn: uploadSingleFile,
  });

  const [profilePreview, setProfilePreview] = useState<string>("");
  const [nidPreview, setNidPreview] = useState<string>("");

  const [profileUploadError, setProfileUploadError] = useState<string>("");
  const [nidUploadError, setNidUploadError] = useState<string>("");

  // Avoid memory leaks when using URL.createObjectURL
  useEffect(() => {
    return () => {
      if (profilePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePreview);
      }
      if (nidPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(nidPreview);
      }
    };
  }, [profilePreview, nidPreview]);

  const form = useForm({
    defaultValues: {
      name: data?.name || "",
      profile_img_url: data?.profile_img_url || "",
      nid_img_url: data?.nid_img_url || "",
      phone_number: data?.phone_number || "",
      email: data?.email || "",
      age: data?.age || "",
      address: data?.address || "",
      gender: data?.gender || "",
      // bio: "",
      training_types: data?.training_types || [],
      training_locations: data?.training_locations || [],
      available_days_in_week: data?.availabile_days_in_week || [],
      slots: data?.slots || [],
      is_approved: data?.is_approved || false,
    } as any,
    validators: {
      onChange: trainerSchema as any,
    },

    onSubmit: async ({ value }) => {
      try {
        const data = await updateTrainerMutation.mutateAsync(value as any);
        console.log("Trainer updated successfully:", data);
        // reset form
        form.reset();
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
    <div className="min-h-screen bg-gray-50/50 md:py-10 py-4 md:px-4">
      <form
        id="trainer-registration-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* 1. PROFILE PHOTO */}
          <div className="flex justify-center">
            <form.Field name="profile_img_url">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                const previewSrc = profilePreview || (field.state.value as any);

                return (
                  <Field
                    data-invalid={isInvalid}
                    className="flex flex-col items-center"
                  >
                    <label
                      className="
              group relative
              w-32 h-32 min-w-[8rem] min-h-[8rem] max-w-[8rem] max-h-[8rem]
              rounded-full border-2 border-dashed
              flex items-center justify-center
              overflow-hidden bg-gray-50 hover:bg-gray-100
              transition-colors cursor-pointer flex-none
            "
                    >
                      {previewSrc ? (
                        <img
                          src={previewSrc}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-400">
                          <Camera className="w-8 h-8 mb-1" />
                          <span className="text-[10px] uppercase font-bold">
                            Photo
                          </span>
                        </div>
                      )}

                      {previewSrc && !profileUploadMutation.isPending && (
                        <button
                          type="button"
                          className="absolute top-4 right-4 bg-white rounded-full p-1 cursor-pointer shadow hover:bg-red-50 text-red-500"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setProfileUploadError("");
                            setProfilePreview("");
                            field.handleChange("");
                          }}
                          aria-label="Remove profile photo"
                        >
                          <X size={16} />
                        </button>
                      )}

                      {profileUploadMutation.isPending && (
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

                          setProfileUploadError("");
                          setProfilePreview(URL.createObjectURL(file));

                          profileUploadMutation.mutate(file, {
                            onSuccess: (url) => {
                              field.handleChange(url);
                              setProfilePreview(url);
                            },
                            onError: (err) => {
                              setProfileUploadError(getErrorMessage(err));
                              field.handleChange("");
                              setProfilePreview("");
                            },
                          });
                        }}
                      />
                    </label>

                    <Label className="mt-3 text-gray-600 font-medium">
                      Profile Picture *
                    </Label>

                    {profileUploadError && (
                      <p className="mt-1 text-sm text-red-600">
                        {profileUploadError}
                      </p>
                    )}

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* 2. PERSONAL INFO */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Full Name *</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="email">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email *</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Your email"
                          autoComplete="email"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name="phone_number">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Phone Number *
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Your phone number"
                          autoComplete="tel"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="age">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Age *</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Your age"
                          autoComplete="off"
                          type="number"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name="gender">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Gender *</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={field.handleChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>
              <form.Field name="address">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Address *</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your address"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              {/* <form.Field name="bio">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Bio *</FieldLabel>
                      <Textarea
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Tell us about yourself..."
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field> */}

              {/* NID UPLOAD */}
              <form.Field name="nid_img_url">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  const previewSrc = nidPreview || (field.state.value as any);

                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="space-y-2 pt-4 border-t">
                        <Label>National ID (NID) *</Label>
                        <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          {previewSrc ? (
                            <div className="relative w-full h-full p-2 flex items-center justify-center">
                              <img
                                src={previewSrc}
                                alt="NID"
                                className="h-full object-contain rounded-md"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center text-gray-500">
                              <UploadCloud className="w-8 h-8 mb-2" />
                              <p className="text-sm font-semibold">
                                Upload File
                              </p>
                            </div>
                          )}

                          {previewSrc && !nidUploadMutation.isPending && (
                            <button
                              type="button"
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 text-red-500"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setNidUploadError("");
                                setNidPreview("");
                                field.handleChange("");
                              }}
                              aria-label="Remove NID photo"
                            >
                              <X size={16} />
                            </button>
                          )}

                          {nidUploadMutation.isPending && (
                            <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs font-semibold text-gray-700">
                              Uploading...
                            </div>
                          )}

                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              // allow re-selecting the same file
                              e.target.value = "";
                              if (!file) return;

                              setNidUploadError("");
                              setNidPreview(URL.createObjectURL(file));

                              nidUploadMutation.mutate(file, {
                                onSuccess: (url) => {
                                  field.handleChange(url);
                                  setNidPreview(url);
                                },
                                onError: (err) => {
                                  setNidUploadError(getErrorMessage(err));
                                  field.handleChange("");
                                  setNidPreview("");
                                },
                              });
                            }}
                          />
                        </label>

                        {nidUploadError && (
                          <p className="mt-1 text-sm text-red-600">
                            {nidUploadError}
                          </p>
                        )}

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </div>
                    </Field>
                  );
                }}
              </form.Field>
            </CardContent>
          </Card>
          {/* is_approved */}
          <form.Field name="is_approved">
            {(field) => (
              <Field>
                <FieldLabel>Is Approved?</FieldLabel>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                  <span className="text-sm">
                    {field.state.value ? "Yes" : "No"}
                  </span>
                </div>
              </Field>
            )}
          </form.Field>

          {/* 3. EXPERTISE & LOCATION */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>
                Select options or type to add new ones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* TRAINING TYPES eita checkbox hobe */}
              <form.Field name="training_types">
                {(field) => (
                  <Field>
                    <FieldLabel>
                      What do you train? (Select multiple) *
                    </FieldLabel>

                    <TrainingTypePicker
                      options={AVAILABLE_TRAINING_TYPES}
                      value={field.state.value}
                      onChange={field.handleChange}
                      placeholder="Type to add new training type..."
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* LOCATIONS */}
              <form.Field name="training_locations">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Preferred Training Locations *</FieldLabel>

                      <MultiSelectWithOther
                        options={AVAILABLE_LOCATIONS}
                        value={field.state.value}
                        onChange={field.handleChange}
                        placeholder="Select area or type 'Other'..."
                        icon={MapPin}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </CardContent>
          </Card>

          {/* 4. AVAILABILITY */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* DAYS */}
              <form.Field name="available_days_in_week">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Available Days *</FieldLabel>

                      <div className="flex flex-wrap gap-3">
                        {DAYS_OPTIONS.map((day) => {
                          const isSelected = field.state.value.includes(day);

                          return (
                            <div
                              key={day}
                              onClick={() => {
                                const newValue = isSelected
                                  ? field.state.value.filter(
                                      (d: any) => d !== day,
                                    )
                                  : [...field.state.value, day];

                                field.handleChange(newValue);
                              }}
                              className={`px-4 py-2 border rounded-full cursor-pointer transition-all text-sm font-medium flex items-center gap-2 ${
                                isSelected
                                  ? "bg-red-600 text-white border-red-600"
                                  : "bg-white hover:bg-gray-100 text-gray-700"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                              {day}
                            </div>
                          );
                        })}
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* SLOTS */}
              {/* SLOTS */}
              <form.Field name="slots">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  const selectedDays =
                    form.state.values.available_days_in_week ?? [];

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Time Slots</FieldLabel>

                      {field.state.value.map((slot: any, index: any) => (
                        <div
                          key={index}
                          className="flex md:items-end gap-3 bg-gray-50 p-3 rounded-md border mt-2 flex-col md:flex-row"
                        >
                          {/* Day */}
                          <div className="flex-1 space-y-1">
                            <Label className="text-xs text-gray-500">Day</Label>

                            <Select
                              value={slot.day_of_week || ""}
                              onValueChange={(val) => {
                                const newSlots = field.state.value.map(
                                  (s: any, i: any) =>
                                    i === index
                                      ? { ...s, day_of_week: val }
                                      : s,
                                );
                                field.handleChange(newSlots);
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                              <SelectContent>
                                {/* Prefer days user selected; fallback to full list */}
                                {(selectedDays.length
                                  ? selectedDays
                                  : DAYS_OPTIONS
                                ).map((day: string) => (
                                  <SelectItem key={day} value={day}>
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Start */}
                          <div className="flex-1 space-y-1">
                            <Label className="text-xs text-gray-500">
                              Start
                            </Label>
                            <Input
                              type="time"
                              value={slot.start}
                              onChange={(e) => {
                                const newSlots = field.state.value.map(
                                  (s: any, i: any) =>
                                    i === index
                                      ? { ...s, start: e.target.value }
                                      : s,
                                );
                                field.handleChange(newSlots);
                              }}
                            />
                          </div>

                          {/* End */}
                          <div className="flex-1 space-y-1">
                            <Label className="text-xs text-gray-500">End</Label>
                            <Input
                              type="time"
                              value={slot.end}
                              onChange={(e) => {
                                const newSlots = field.state.value.map(
                                  (s: any, i: any) =>
                                    i === index
                                      ? { ...s, end: e.target.value }
                                      : s,
                                );
                                field.handleChange(newSlots);
                              }}
                            />
                          </div>

                          {/* Remove */}
                          <div className="flex items-center justify-end">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:bg-red-50 "
                              onClick={() =>
                                field.handleChange(
                                  field.state.value.filter(
                                    (_: any, i: any) => i !== index,
                                  ),
                                )
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-dashed border-2 mt-3"
                        onClick={() => {
                          const defaultDay =
                            form.state.values.available_days_in_week?.[0] ?? "";
                          field.handleChange([
                            ...field.state.value,
                            { day_of_week: defaultDay, start: "", end: "" },
                          ]);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Time Slot
                      </Button>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </CardContent>
          </Card>

          {/* SUBMIT BUTTON */}
          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {submitError}
            </div>
          )}
          <div className="sticky bottom-4 z-10">
            <Button
              type="submit"
              size="lg"
              className="w-full shadow-xl bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg"
              disabled={
                form.state.isSubmitting ||
                updateTrainerMutation.isPending ||
                profileUploadMutation.isPending ||
                nidUploadMutation.isPending
              }
            >
              {profileUploadMutation.isPending || nidUploadMutation.isPending
                ? "Uploading file..."
                : form.state.isSubmitting || updateTrainerMutation.isPending
                  ? "Submitting..."
                  : "Submit Registration"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Something went wrong. Please try again.";
}
