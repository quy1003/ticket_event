import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/tags - Get all tags
export async function GET(request: NextRequest) {
  try {
    console.log('Request: ', request)
    const tags = await prisma.tag.findMany({
      include: {
        events: true,
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(tags, { status: 200 })
  } catch (error) {
    console.error('GET /api/tags error:', error)
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}

// POST /api/tags - Create a new tag
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug } = body

    if (!name || !slug) {
      return NextResponse.json({ error: 'Missing required fields: name, slug' }, { status: 400 })
    }

    const tag = await prisma.tag.create({
      data: { name, slug },
    })

    return NextResponse.json(tag, { status: 201 })
  } catch (error) {
    console.error('POST /api/tags error:', error)
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 })
  }
}
