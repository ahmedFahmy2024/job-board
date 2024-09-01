import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image",
  )
  .refine(
    (file) => !file || file.size < 2 * 1024 * 1024,
    "Must be less than 2MB",
  );

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Must have either an application email or an application url",
    path: ["applicationEmail"],
  });

  const locationSchema = z
  .object({
    locationType: z
      .string()
      .min(1, "Type is required")
      .refine(
        (value) => locationTypes.includes(value),
        "Invalid Location type",
      ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      data.locationType === "Remote" || (data.locationType !== "Remote" && data.location),
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(100),
    type: z
      .string()
      .min(1, "Type is required")
      .refine((value) => jobTypes.includes(value), "Invalid Job type"),
    companyName: z.string().min(1, "Company name is required").max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: z
      .string()
      .min(1, "required")
      .regex(/^\d+$/, "Must be a number")
      .max(9, "Must be less than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValue = z.infer<typeof jobFilterSchema>;
