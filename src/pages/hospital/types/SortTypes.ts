import { HospitalKeys } from "../models/hospitalCreateSchema";

export type AllowedSortFields = Extract<
  HospitalKeys,
  "name" | "phone" | "email" | "ruc"
>;
