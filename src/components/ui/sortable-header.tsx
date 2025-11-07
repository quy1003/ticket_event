'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronUp, ChevronDown } from 'lucide-react'

type SortableHeaderProps = {
  column: string
}

export default function SortableHeader({ column }: SortableHeaderProps) {
  const searchParams = useSearchParams()
  const currentSortBy = searchParams.get('sortBy') || ''
  const currentOrder = searchParams.get('order') || 'asc'

  const newOrder = currentSortBy === column && currentOrder === 'asc' ? 'desc' : 'asc'

  const params = new URLSearchParams(searchParams)
  params.set('sortBy', column)
  params.set('order', newOrder)

  const href = `?${params.toString()}`

  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
    >
      <Link href={href} className="flex items-center">
        {column}
        {currentSortBy === column && (
          <span className="ml-1">
            {currentOrder === 'asc' ? (
              <ChevronUp className="w-4 h-4 inline" />
            ) : (
              <ChevronDown className="w-4 h-4 inline" />
            )}
          </span>
        )}
      </Link>
    </th>
  )
}
