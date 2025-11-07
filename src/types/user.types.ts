import type { User as PrismaUser } from '@prisma/client'

export type User = PrismaUser

export type PublicUser = Omit<User, 'password'>

export interface CreateUserDTO {
  name: string
  email: string
  password: string
}

export type UpdateUserDTO = Partial<CreateUserDTO>
