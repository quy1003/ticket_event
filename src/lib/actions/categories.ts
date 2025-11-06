'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { events: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    return { success: true, data: categories }
  } catch (error) {
    console.error('getCategories error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch categories',
    }
  }
}

export async function createCategory(name: string, slug: string) {
  try {
    const category = await prisma.category.create({
      data: { name, slug },
    })

    revalidatePath('/events')
    return { success: true, data: category }
  } catch (error) {
    console.error('createCategory error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create category',
    }
  }
}
