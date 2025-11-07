import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    console.log('Request: ', request)
    const categories = await prisma.category.findMany({
      include: {
        events: true,
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.error('GET /api/categories error:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// GET /api/categories/:slug - Get category by slug
export async function GET_BY_SLUG(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        events: true,
      },
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json(category, { status: 200 })
  } catch (error) {
    console.error('GET_BY_SLUG /api/categories error:', error)
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug } = body

    if (!name || !slug) {
      return NextResponse.json({ error: 'Missing required fields: name, slug' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name, slug },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('POST /api/categories error:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
