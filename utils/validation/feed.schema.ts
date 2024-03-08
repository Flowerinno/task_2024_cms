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
		.default(5),
	include_links: z.boolean().default(false),
});

export type StepOneVerifySchema = z.infer<typeof stepOneVerifySchema>;
export type AddFeedSchema = z.infer<typeof addFeedSchema>;
