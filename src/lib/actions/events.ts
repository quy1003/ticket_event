'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface CreateEventInput {
  title: string
  slug: string
  description?: string
  date: Date
  time?: string
  location?: string
  imageUrl?: string
  price?: number
  attendees?: number
  createdBy: number
  categoryIds?: number[]
  tagIds?: number[]
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: number
}

// Create event
export async function createEvent(input: CreateEventInput) {
  try {
    const event = await prisma.event.create({
      data: {
        title: input.title,
        slug: input.slug,
        description: input.description,
        date: input.date,
        time: input.time,
        location: input.location,
        imageUrl: input.imageUrl,
        price: input.price,
        attendees: input.attendees || 0,
        createdBy: input.createdBy,
        categories: input.categoryIds
          ? {
              create: input.categoryIds.map((categoryId) => ({
                categoryId,
              })),
            }
          : undefined,
        tags: input.tagIds
          ? {
              create: input.tagIds.map((tagId) => ({
                tagId,
              })),
            }
          : undefined,
      },
      include: {
        user: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    })

    revalidatePath('/events')
    return { success: true, data: event }
  } catch (error) {
    console.error('createEvent error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create event',
    }
  }
}

// Update event
export async function updateEvent(input: UpdateEventInput) {
  try {
    if (!input.id) {
      return { success: false, error: 'Event ID is required' }
    }

    const event = await prisma.event.update({
      where: { id: input.id },
      data: {
        title: input.title,
        slug: input.slug,
        description: input.description,
        date: input.date,
        time: input.time,
        location: input.location,
        imageUrl: input.imageUrl,
        price: input.price,
        attendees: input.attendees,
        categories: input.categoryIds
          ? {
              deleteMany: {},
              create: input.categoryIds.map((categoryId) => ({
                categoryId,
              })),
            }
          : undefined,
        tags: input.tagIds
          ? {
              deleteMany: {},
              create: input.tagIds.map((tagId) => ({
                tagId,
              })),
            }
          : undefined,
      },
      include: {
        user: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    })

    revalidatePath('/events')
    return { success: true, data: event }
  } catch (error) {
    console.error('updateEvent error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update event',
    }
  }
}

// Delete event
export async function deleteEvent(eventId: number) {
  try {
    await prisma.event.delete({
      where: { id: eventId },
    })

    revalidatePath('/events')
    return { success: true }
  } catch (error) {
    console.error('deleteEvent error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete event',
    }
  }
}

// Get single event
export async function getEvent(eventId: number) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        user: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    })

    if (!event) {
      return { success: false, error: 'Event not found' }
    }

    return { success: true, data: event }
  } catch (error) {
    console.error('getEvent error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch event',
    }
  }
}

// Get all events with filters
export async function getAllEvents(filters?: {
  page?: number
  limit?: number
  categoryId?: number
}) {
  try {
    const page = filters?.page || 1
    const limit = filters?.limit || 10
    const skip = (page - 1) * limit

    const where: any = {}
    if (filters?.categoryId) {
      where.categories = {
        some: {
          categoryId: filters.categoryId,
        },
      }
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: true,
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
        orderBy: { date: 'desc' },
      }),
      prisma.event.count({ where }),
    ])

    return {
      success: true,
      data: {
        events,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    }
  } catch (error) {
    console.error('getAllEvents error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch events',
    }
  }
}
