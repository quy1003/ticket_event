import type { User as PrismaUser } from '@prisma/client'

export type User = PrismaUser

export type PublicUser = Omit<User, 'password'>

export interface UserType {
  name: string
  email: string
  password: string
  createdAt?: string
  updatedAt?: string
}

export type UpdateUserDTO = Partial<UserType>
