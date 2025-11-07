import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { APIResponse } from '@/types/api-response'
import { ParamsList } from '@/types/params-list.types'

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
    const query: ParamsList = {}

    searchParams.forEach((value, key) => {
      switch (key) {
        case 'page':
        case 'limit': {
          const num = parseInt(value, 10)
          if (!isNaN(num)) query[key] = num
          break
        }
        case 'order': {
          query.order = value === 'desc' ? 'desc' : 'asc'
          break
        }
        case 'search':
        case 'sortBy': {
          query[key] = value
          break
        }
        default:
          break
      }
    })

    const page = query.page && query.page > 0 ? query.page : 1
    const limit =
      query.limit && query.limit > 0
        ? query.limit
        : parseInt(process.env.LIMIT_ITEMS_PER_PAGE || '10', 10)

    if (page < 1 || limit < 1) {
      const res: APIResponse = {
        success: false,
        message: 'Page and limit must be positive numbers',
      }
      return NextResponse.json(res, { status: 400 })
    }

    const where: any = {}
    if (query.search) {
      where.OR = [
        { name: { contains: query.search as string, mode: 'insensitive' } },
        { email: { contains: query.search as string, mode: 'insensitive' } },
      ]
    }

    const allowedSortFields = ['id', 'name', 'email', 'createdAt']
    const safeSortBy =
      query.sortBy && allowedSortFields.includes(query.sortBy) ? query.sortBy : 'id'
    const safeOrder: 'asc' | 'desc' = query.order === 'desc' ? 'desc' : 'asc'

    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [safeSortBy]: safeOrder },
    })

    const totalUsers = await prisma.user.count({ where })
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
