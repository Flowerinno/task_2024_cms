import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  is_admin: z.boolean().default(false),
});

export const editUserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum(["ADMIN", "USER"]),
  is_blocked: z.boolean(),
  is_deleted: z.boolean(),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
