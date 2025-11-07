import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { APIResponse } from '@/types/api-response'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, password' },
        { status: 400 }
      )
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '10')
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({ data: { name, email, password: hashedPassword } })

    const res: APIResponse<typeof user> = { success: true, data: user }
    return NextResponse.json(res, { status: 201 })
  } catch (error) {
    console.error('POST /api/users error:', error)
    const res: APIResponse = { success: false, message: 'Failed to create user' }
    return NextResponse.json(res, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || process.env.LIMIT_ITEMS_PER_PAGE || '10')

    if (page < 1 || limit < 1) {
      const res: APIResponse = {
        success: false,
        message: 'Page and limit must be positive numbers',
      }
      return NextResponse.json(res, { status: 400 })
    }

    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: 'asc' },
    })

    const totalUsers = await prisma.user.count()
    const totalPages = Math.ceil(totalUsers / limit)

    const res: APIResponse<typeof users> = {
      success: true,
      data: users,
      meta: { page, limit, totalItems: totalUsers, totalPages },
    }

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error('GET /api/users error:', error)
    const res: APIResponse = { success: false, message: 'Failed to fetch users' }
    return NextResponse.json(res, { status: 500 })
  }
}
