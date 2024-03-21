import z from "zod";

export const createAdSchema = z.object({
  title: z
    .string()
    .min(4, "Title must be at least 4 characters long")
    .max(150, "Title must be less than 150 characters long"),
  link: z.string().optional(),
  media: z.string().optional(),
  is_active: z.boolean().default(false),
  is_feed: z.boolean().default(true),
  is_search: z.boolean().default(false),
  ad_priority: z.string().optional(),
  post_id: z.number().optional(),
});

export const updateAdSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .min(4, "Title must be at least 4 characters long")
    .max(150, "Title must be less than 150 characters long"),
  link: z.string().optional(),
  is_active: z.boolean().default(false),
  ad_priority: z.string().refine((x) => {
    if (x && Number(x) >= 0 && Number(x) <= 100) {
      return true;
    }
    return false;
  }, "Priority must be a number between 0 and 100"),
});

export type CreateAdSchema = z.infer<typeof createAdSchema>;
export type UpdateAdSchema = z.infer<typeof updateAdSchema>;
