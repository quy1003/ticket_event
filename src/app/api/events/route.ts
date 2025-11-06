import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/events - Get all events with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const skip = (page - 1) * limit

    const where: any = {}
    if (category) {
      where.categories = {
        some: {
          category: {
            slug: category,
          },
        },
      }
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
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
        orderBy: { createdAt: 'desc' },
      }),
      prisma.event.count({ where }),
    ])

    return NextResponse.json(
      {
        events,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('GET /api/events error:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
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
      createdBy,
      categoryIds,
      tagIds,
    } = body

    // Validate required fields
    if (!title || !slug || !date || !createdBy) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, date, createdBy' },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        date: new Date(date),
        time,
        location,
        imageUrl,
        price: price ? parseFloat(price) : null,
        attendees: attendees || 0,
        createdBy,
        categories: categoryIds
          ? {
              create: categoryIds.map((categoryId: number) => ({
                categoryId,
              })),
            }
          : undefined,
        tags: tagIds
          ? {
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

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('POST /api/events error:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
