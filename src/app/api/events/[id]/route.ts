import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/events/[id] - Get a single event by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        categories: {
          include: { category: true },
        },
        tags: {
          include: { tag: true },
        },
      },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.error(`GET /api/events/${params.id} error:`, error)
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}

// PUT /api/events/[id] - Update an event
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const {
      title,
      slug,
      description,
      date,
      time,
      location,
      imageUrl,
      price,
      attendees,
      categoryIds,
      tagIds,
    } = body

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: parseInt(id) },
    })

    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Update event with nested operations for categories and tags
    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug,
        description,
        date: date ? new Date(date) : undefined,
        time,
        location,
        imageUrl,
        price: price ? parseFloat(price) : null,
        attendees: attendees ?? undefined,
        categories: categoryIds
          ? {
              deleteMany: {}, // Remove all existing
              create: categoryIds.map((categoryId: number) => ({
                categoryId,
              })),
            }
          : undefined,
        tags: tagIds
          ? {
              deleteMany: {},
              create: tagIds.map((tagId: number) => ({
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

    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.error(`PUT /api/events/${params.id} error:`, error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

// DELETE /api/events/[id] - Delete an event
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Delete event (categories and tags will be cascade deleted)
    await prisma.event.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error(`DELETE /api/events/${params.id} error:`, error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}
