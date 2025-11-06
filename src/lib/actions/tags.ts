'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTags() {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { events: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    return { success: true, data: tags }
  } catch (error) {
    console.error('getTags error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch tags',
    }
  }
}

export async function createTag(name: string, slug: string) {
  try {
    const tag = await prisma.tag.create({
      data: { name, slug },
    })

    revalidatePath('/events')
    return { success: true, data: tag }
  } catch (error) {
    console.error('createTag error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create tag',
    }
  }
}
