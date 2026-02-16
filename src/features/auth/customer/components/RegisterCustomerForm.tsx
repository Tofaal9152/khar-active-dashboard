"use client";

import { SmartForm, SmartFormField } from "@/components/smart-form";

import SingleFileUploader from "@/components/shared/SingleFileUploader";
import { useRouter } from "next/navigation";
import {
  createUser,
  userRegistrationSchema,
} from "../services/customer.service";

const UserRegistrationForm = () => {
  const router = useRouter();
  return (
    <SmartForm
      schema={userRegistrationSchema}
      mutationFn={createUser}
      mode={"create"}
      submitText={"Create User"}
      className="w-full max-w-4xl mx-auto p-4 rounded-md border border-cyan-400/25  shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur pt-12"
      onSuccess={() => {
        router.push("/auth/verify-email");
      }}
    >
      {(form) => (
        <div className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SmartFormField
              form={form}
              name="first_name"
              type="text"
              label="First Name"
              placeholder="Enter first name"
            />
            <SmartFormField
              form={form}
              name="last_name"
              type="text"
              label="Last Name"
              placeholder="Enter last name"
            />
          </div>

          {/* Contact Information */}
          <SmartFormField
            form={form}
            name="email"
            type="email"
            label="Email Address"
            placeholder="example@gmail.com"
          />

          <SmartFormField
            form={form}
            name="phone_number"
            type="text"
            label="Phone Number"
            placeholder="+8801712345678"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SmartFormField
              form={form}
              name="password1"
              type="password"
              label="Password"
              placeholder="Enter password"
            />
            <SmartFormField
              form={form}
              name="password2"
              type="password"
              label="Confirm Password"
              placeholder="Confirm password"
            />
          </div>
          <SmartFormField
            form={form}
            name="date_of_birth"
            type="date"
            label="Date of Birth"
          />

          <SmartFormField
            form={form}
            name="country"
            type="text"
            label="Country"
            placeholder="Enter country"
          />

          <SmartFormField
            form={form}
            name="address"
            type="textarea"
            label="Address"
            placeholder="Enter full address"
          />

          <SmartFormField
            form={form}
            name="passport_number"
            type="text"
            label="Passport Number"
            placeholder="Enter passport number"
          />

          <SingleFileUploader
            label="Upload Profile Picture"
            value={form.watch("profile_picture") || ""}
            onChange={(url) => {
              form.setValue("profile_picture", url, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
            accept="image/*"
          />
        </div>
      )}
    </SmartForm>
  );
};

export default UserRegistrationForm;
