import { z } from "zod";

export const experienceSchema = z.object({
  jobTitle: z
    .string()
    .min(2, "Job title required"),

  employer: z
    .string()
    .min(2, "Employer required"),

  location: z.string(),

  startDate: z.string(),

  endDate: z.string(),

  currentlyWorking: z.boolean(),

  description: z.string(),
});