import { z } from "zod";
import httpClient from "@/utils/httpClient";

export const assignTrainerSchema = z.object({
  session_id: z.string().min(1, "Session is required"),
  trainer_id: z.string().min(1, "Trainer is required"),
});
export type AssignTrainerPayload = z.infer<typeof assignTrainerSchema>;
export const assignTrainer = (payload: AssignTrainerPayload) => {
  return httpClient.post(`/active/admin/sessions/assign/`, {
    trainer_id: payload.trainer_id,
    session_id: payload.session_id,
  });
};
