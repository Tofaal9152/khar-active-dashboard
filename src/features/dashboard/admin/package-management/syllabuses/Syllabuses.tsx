"use client";

import { useForm } from "@tanstack/react-form";
import {
  BookOpen,
  Clock,
  FileText,
  Plus,
  Video
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import { AppDialog } from "@/components/shared/AppDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock Data
const syllabuses = [
  {
    id: "pkg-1",
    packageName: "Beginner Boxing",
    modules: [
      { title: "Week 1: Stance & Footwork", duration: "2h 30m", type: "Video" },
      {
        title: "Week 2: Basic Jab & Cross",
        duration: "3h 00m",
        type: "Practical",
      },
    ],
  },
];

// Module Validation Schema
const moduleSchema = z.object({
  packageId: z.string().min(1, "Please select a package"),
  title: z.string().min(3, "Title is required"),
  duration: z.string().min(2, "Duration required (e.g. 1h)"),
  type: z.string().min(1, "Select a type"),
});

export default function SyllabusesPage() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      packageId: "",
      title: "",
      duration: "",
      type: "",
    },
    validators: {
      onSubmit: moduleSchema as any,
    },
    onSubmit: async ({ value }) => {
      console.log("Module Added:", value);
      toast.success("Module added successfully!");
      setOpen(false);
      form.reset();
    },
  });

  return (
    <div className="space-y-6 p-6 bg-gray-50/30 min-h-screen">
      <div className="flex justify-between items-center border-b border-red-100 pb-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase flex items-center gap-2">
            <div className="w-2 h-8 bg-red-600 rounded-full" />
            Course Syllabuses
          </h2>
          <p className="text-sm text-gray-500 font-medium ml-4">
            Manage curriculum and learning modules.
          </p>
        </div>
        <AppDialog
          title="Add New Module"
          trigger={
            <Button variant="destructive" className="flex items-center gap-2">
              <Plus size={16} />
              Add Module
            </Button>
          }
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4 py-4"
          >
            {/* Package Select */}
            <form.Field name="packageId">
              {(field) => (
                <Field>
                  <FieldLabel className="text-red-900 font-bold uppercase text-[10px] tracking-widest">
                    Select Package
                  </FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger className="focus:ring-red-500 border-red-100">
                      <SelectValue placeholder="Choose Package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pkg-1">Beginner Boxing</SelectItem>
                      <SelectItem value="pkg-2">Pro Fighter Camp</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.isTouched && (
                    <FieldError
                      className="text-red-600"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              )}
            </form.Field>

            <form.Field name="title">
              {(field) => (
                <Field>
                  <FieldLabel className="text-red-900 font-bold uppercase text-[10px] tracking-widest">
                    Module Title
                  </FieldLabel>
                  <Input
                    placeholder="e.g. Advanced Footwork"
                    className="focus-visible:ring-red-500 border-red-100"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && (
                    <FieldError
                      className="text-red-600"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              )}
            </form.Field>

            <div className="grid grid-cols-2 gap-4">
              <form.Field name="duration">
                {(field) => (
                  <Field>
                    <FieldLabel className="text-red-900 font-bold uppercase text-[10px] tracking-widest">
                      Duration
                    </FieldLabel>
                    <Input
                      placeholder="e.g. 2h 30m"
                      className="focus-visible:ring-red-500 border-red-100"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched && (
                      <FieldError
                        className="text-red-600"
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Field name="type">
                {(field) => (
                  <Field>
                    <FieldLabel className="text-red-900 font-bold uppercase text-[10px] tracking-widest">
                      Type
                    </FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger className="focus:ring-red-500 border-red-100">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Practical">Practical</SelectItem>
                        <SelectItem value="Reading">Reading</SelectItem>
                      </SelectContent>
                    </Select>
                    {field.state.meta.isTouched && (
                      <FieldError
                        className="text-red-600"
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                )}
              </form.Field>
            </div>

            <div className="flex justify-end pt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 w-full"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Module"}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </AppDialog>
      </div>

      <div className="grid gap-6">
        {syllabuses.map((syllabus) => (
          <Card
            key={syllabus.id}
            className="border-l-4 border-l-red-600 shadow-sm overflow-hidden"
          >
            <CardHeader className="bg-red-50/30 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  {syllabus.packageName}
                </CardTitle>
                <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
                  {syllabus.modules.length} Modules
                </Badge>
              </div>
              <CardDescription className="text-red-800 font-medium">
                Curriculum Breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {syllabus.modules.map((module, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="border-b last:border-b-0 px-4"
                  >
                    <AccordionTrigger className="hover:no-underline hover:bg-red-50/50 py-4 rounded-md transition-all group">
                      <div className="flex items-center gap-4">
                        <span className="bg-red-600 text-white text-xs font-black w-7 h-7 flex items-center justify-center rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                          {module.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-1">
                      <div className="flex items-center gap-6 text-sm ml-11">
                        <div className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          <Clock className="w-3.5 h-3.5 text-red-500" />
                          <span className="font-semibold">
                            {module.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {module.type === "Video" ? (
                            <Video className="w-3.5 h-3.5 text-red-500" />
                          ) : (
                            <FileText className="w-3.5 h-3.5 text-red-500" />
                          )}
                          <span className="font-semibold">{module.type}</span>
                        </div>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-red-600 font-black uppercase text-[11px] tracking-tighter ml-auto hover:no-underline hover:text-red-800"
                        >
                          Edit Content →
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
