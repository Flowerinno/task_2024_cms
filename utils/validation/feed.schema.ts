import z from "zod";

export const stepOneVerifySchema = z.object({
  url: z.string().min(1),
});

export const addFeedSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters long"),
  tags: z
    .array(z.string().min(1, "Tag must be at least 1 character long"))
    .min(1, "At least one tag is required"),
  is_active: z.boolean().default(false),
  import_interval: z
    .number({
      errorMap: () => {
        return { message: "Input must be a number" };
      },
    })
    .min(5, "Interval must be at least 5 minutes")
    .default(5),
  include_links: z.boolean().default(false),
});

export const createTagsSchema = z.object({
  label: z
    .string()
    .min(3, "Label must be at least 3 characters long")
    .max(10, "Label must be at most 10 characters long"),
  is_active: z.boolean().default(false),
});

export const createPostSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters long"),
  content: z.string().optional(),
  link: z.string().optional(),
  creator: z.string().optional(),
  pubDate_included: z.boolean().default(false),
  tags: z
    .array(z.string().min(1, "Tag must be at least 1 character long"))
    .min(1, "At least one tag is required"),
  is_active: z.boolean().default(false),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type CreateTagsSchema = z.infer<typeof createTagsSchema>;
export type StepOneVerifySchema = z.infer<typeof stepOneVerifySchema>;
export type AddFeedSchema = z.infer<typeof addFeedSchema>;
