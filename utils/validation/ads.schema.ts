import z from "zod";

export const createAdSchema = z.object({
  title: z
    .string()
    .min(4, "Title must be at least 4 characters long")
    .max(150, "Title must be less than 150 characters long"),
  link: z.string().optional(),
  media: z.string().optional(),
  is_active: z.boolean().default(false),
  ad_priority: z.string().optional(),
  post_id: z.number().optional(),
});

export type CreateAdSchema = z.infer<typeof createAdSchema>;
