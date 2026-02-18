"use client";

import { SmartForm, SmartFormField } from "@/components/shared/smart-form";
import {
  ALL_TRAINER_KEY,
  createTrainer,
  trainerSchema,
  updateTrainer,
} from "../../trainer/services/trainer.service";

export default function TrainerForm({
  mode = "create",
  data,
}: {
  mode: "create" | "edit";
  data?: any;
}) {
  const isEdit = mode === "edit";

  const handleSubmit = (payload: any) => {
    return isEdit ? updateTrainer(data.id, payload) : createTrainer(payload);
  };

  return (
    <SmartForm
      schema={trainerSchema}
      mutationFn={handleSubmit}
      queryKey={[ALL_TRAINER_KEY]}
      mode={"create"}
      submitText={isEdit ? "Update Trainer" : "Create Trainer"}
      defaultValues={{
        firstName: isEdit ? data.first_name : "",
        lastName: isEdit ? data.last_name : "",
        email: isEdit ? data.email : "",
        phoneNumber: isEdit ? data.phone_number : "",
      }}
    >
      {(form) => (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SmartFormField
              form={form}
              name="firstName"
              type="text"
              label="First Name"
              placeholder="Enter first name"
            />
            <SmartFormField
              form={form}
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Enter last name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SmartFormField
              form={form}
              name="email"
              type="email"
              label="Email"
              placeholder="Enter email address"
            />
            <SmartFormField
              form={form}
              name="phoneNumber"
              type="text"
              label="Phone Number"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      )}
    </SmartForm>
  );
}
