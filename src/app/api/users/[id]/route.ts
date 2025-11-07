import { prisma } from '@/lib/prisma'
import { APIResponse } from '@/types/api-response'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = (await params) as { id: string }
    const userId = parseInt(id, 10)
    console.log('Fetching user with ID:', userId)
    if (isNaN(userId)) {
      const res: APIResponse = { success: false, message: 'Invalid user ID' }
      return NextResponse.json(res, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      const res: APIResponse = { success: false, message: 'User not found' }
      return NextResponse.json(res, { status: 404 })
    }

    const res: APIResponse<typeof user> = { success: true, data: user }
    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error('GET /api/users/[id] error:', error)
    const res: APIResponse = { success: false, message: 'Failed to fetch user' }
    return NextResponse.json(res, { status: 500 })
  }
}
