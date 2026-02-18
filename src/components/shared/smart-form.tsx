"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import {
  useForm,
  type Control,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { ZodSchema } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "../ui/spinner";

type Option = {
  label: string;
  value: string;
};

type SmartFormMode = "create" | "update";

type SmartFormProps<TSchema extends ZodSchema> = {
  schema: TSchema;
  mutationFn: (data: any) => Promise<unknown>;
  queryKey?: QueryKey;
  mode?: SmartFormMode;
  defaultValues?: Partial<any>;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
  submitText?: string;
  className?: string;
  children: (form: UseFormReturn<any>) => ReactNode;
};

export function SmartForm<TSchema extends ZodSchema>({
  schema,
  mutationFn,
  queryKey = [],
  mode = "create",
  defaultValues,
  onSuccess,
  onError,
  submitText,
  className,
  children,
}: SmartFormProps<TSchema>) {
  const queryClient = useQueryClient();
  const [initialized, setInitialized] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(schema as any),
    defaultValues: (defaultValues || {}) as any,
  });

  useEffect(() => {
    if (!initialized && defaultValues) {
      form.reset(defaultValues as any);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialized(true);
    }
  }, [defaultValues, form, initialized]);

  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (Array.isArray(queryKey) && queryKey.length > 0) {
        queryClient.invalidateQueries({ queryKey });
      }

      if (mode === "create") {
        form.reset((defaultValues || {}) as any);
      }

      onSuccess?.(data);
      toast.success("Successfully submitted!");
    },
    onError: (error: unknown) => {
      const err = error instanceof Error ? error : new Error("Unknown error");
      onError?.(err);

      const maybeAxios = error as { response?: { data?: any } } | undefined;
      const message =
        maybeAxios?.response?.data?.message ??
        maybeAxios?.response?.data?.msg ??
        "An unknown error occurred.";

      toast.error(message);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <Card className={cn("w-full rounded-xl", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-5">
            <div className="space-y-6">{children(form)}</div>

            <div className="flex items-center justify-end pt-4 mt-4 border-t">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="min-w-32"
              >
                {mutation.isPending ? (
                  <>
                    <Spinner />
                    {mode === "create" ? "Creating..." : "Updating..."}
                  </>
                ) : (
                  <>
                    {mutation.isSuccess ? (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    ) : mutation.isError ? (
                      <AlertCircle className="mr-2 h-4 w-4" />
                    ) : null}
                    {submitText || (mode === "create" ? "Create" : "Update")}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}

type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "shadcnSelect"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "color";

type SmartFormFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  type: FieldType;
  label?: string;
  placeholder?: string;
  description?: string;
  options?: Option[];
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
};

export function SmartFormField<T extends FieldValues>({
  form,
  name,
  type,
  label,
  placeholder,
  description,
  options = [],
  disabled,
  readonly,
  className,
}: SmartFormFieldProps<T>) {
  const baseInput = "border rounded";

  const renderField = (field: any) => {
    switch (type) {
      case "text":
      case "email":
      case "password":
        return (
          <Input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            className={cn(baseInput, className)}
            {...field}
            value={field.value || ""}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={placeholder}
            disabled={disabled}
            className={cn(baseInput, className)}
            {...field}
            value={field.value ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value === "" ? undefined : Number(value));
            }}
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={placeholder}
            disabled={disabled}
            rows={3}
            className={cn(baseInput, className)}
            {...field}
            value={field.value || ""}
          />
        );

      case "select":
        return (
          <NativeSelect
            value={(field.value as string) || ""}
            onChange={(e) => field.onChange(e.target.value)}
            disabled={disabled}
            className={cn("w-full border rounded", className)}
          >
            <NativeSelectOption value="" disabled>
              {placeholder || `Select ${label ?? ""}`.trim()}
            </NativeSelectOption>

            {options.map((option, idx) => (
              <NativeSelectOption key={idx} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        );

      case "shadcnSelect":
        return (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value as string | undefined}
            disabled={disabled}
          >
            <SelectTrigger className={cn("w-full", className)}>
              <SelectValue placeholder={placeholder || `Select ${label ?? ""}`} />
            </SelectTrigger>

            <SelectContent className="w-(--radix-select-trigger-width)">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
            <label className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value as string | undefined}
            disabled={disabled}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${String(name)}-${option.value}`}
                />
                <label
                  htmlFor={`${String(name)}-${option.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        );

      case "date":
        return (
          <Input
            type="date"
            placeholder={placeholder}
            disabled={disabled}
            className={cn(baseInput, className)}
            {...field}
            value={field.value || ""}
          />
        );

      case "time":
        return (
          <Input
            type="time"
            placeholder={placeholder}
            disabled={disabled}
            className={cn(baseInput, className)}
            {...field}
            value={field.value || ""}
          />
        );

      case "color":
        return (
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              disabled={disabled}
              className="w-12 h-10 p-1 border rounded"
              value={(field.value as string) || "#000000"}
              onChange={(e) => field.onChange(e.target.value)}
            />
            <Input
              type="text"
              placeholder="#000000"
              disabled={disabled}
              className={cn(baseInput, "flex-1", className)}
              value={(field.value as string) || ""}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (type === "checkbox") {
    return (
      <FormField
        control={form.control as unknown as Control<FieldValues>}
        name={name as unknown as Path<FieldValues>}
        render={({ field }) => (
          <FormItem className={cn("space-y-2", className)}>
            <FormControl>{renderField(field)}</FormControl>
            {description && (
              <FormDescription>{description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={form.control as unknown as Control<FieldValues>}
      name={name as unknown as Path<FieldValues>}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{renderField(field)}</FormControl>
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-1">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="text-sm">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

type ConditionalFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  when: Path<T>;
  equals: unknown;
  children: ReactNode;
};

export function ConditionalField<T extends FieldValues>({
  form,
  when,
  equals,
  children,
}: ConditionalFieldProps<T>) {
  const watchedValue = form.watch(when);

  if (watchedValue === equals) return <>{children}</>;
  return null;
}
