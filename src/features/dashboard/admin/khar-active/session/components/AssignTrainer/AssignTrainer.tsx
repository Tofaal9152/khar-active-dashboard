"use client";

import { SmartForm, SmartFormField } from "@/components/shared/smart-form";
import { getAllTrainerNonPaginated } from "../../../trainer/services/trainer.service";

import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import {
  assignTrainer,
  assignTrainerSchema,
} from "../../services/assignTrainer.service";
import { All_SESSION_Bookings_KEY } from "../../services/session.service";

const AssignTrainer = ({
  sessionId,
  onSuccess,
}: {
  sessionId: string;
  onSuccess?: (data: any) => void;
}) => {
  const {
    data: trainersData,
    isLoading: trainersLoading,
    error: trainersError,
  } = getAllTrainerNonPaginated();

  // তোমার response shape অনুযায়ী adjust:
  const trainers: any[] = trainersData?.results || trainersData || [];

  const trainerOptions = trainers.map((t) => ({
    value: t.id,
    label:
      t.name ||
      `${t.first_name || ""} ${t.last_name || ""}`.trim() ||
      t.email ||
      "Trainer",
  }));

  const handleSubmit = (payload:any) => {
    // payload: { session_id, trainer_id }
    return assignTrainer(payload);
  };

  return (
    <AsyncStateWrapper loading={trainersLoading} error={trainersError?.message}>
      <SmartForm
        schema={assignTrainerSchema}
        mutationFn={handleSubmit}
        queryKey={[All_SESSION_Bookings_KEY]}
        submitText="Assign Trainer"
        defaultValues={{
          session_id: sessionId,
          trainer_id: "",
        }}
        onSuccess={(data) => {
          onSuccess?.(data);
        }}
      >
        {(form) => (
          <div className="space-y-4">
            {/* Session ID (read only) */}
            <SmartFormField
              form={form}
              name="session_id"
              type="text"
              label="Session ID"
              placeholder="Session ID"
              disabled
            />

            {/* Trainer select */}
            <SmartFormField
              form={form}
              name="trainer_id"
              type="shadcnSelect"
              label="Trainer"
              placeholder="Select a trainer"
              options={trainerOptions}
            />
          </div>
        )}
      </SmartForm>
    </AsyncStateWrapper>
  );
};

export default AssignTrainer;
