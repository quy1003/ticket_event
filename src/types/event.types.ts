import type { Event as PrismaEvent } from '@prisma/client'

export type Event = PrismaEvent

export interface CreateEventDTO {
  title: string
  slug: string
  description?: string
  date: string | Date
  time?: string
  location?: string
  imageUrl?: string
  price?: number
  attendees?: number
  createdBy: number
  categoryIds?: number[]
  tagIds?: number[]
}

export type UpdateEventDTO = Partial<CreateEventDTO> & { id: number }

export type EventSummary = Pick<
  Event,
  'id' | 'title' | 'slug' | 'date' | 'location' | 'price' | 'attendees' | 'createdAt'
>
