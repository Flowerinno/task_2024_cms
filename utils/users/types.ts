import { User } from '@prisma/client'
import { EditUserSchema } from 'utils/validation/user.schema';

export type GetUsersResponse = { users: User[] | []; maxPage: number }

export type EditUserResponse = EditUserSchema | undefined