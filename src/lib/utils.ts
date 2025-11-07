import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generatePaginationLinks(
  current: number,
  total: number,
  maxLinks: number = 5
): number[] {
  let start = Math.max(1, current - Math.floor(maxLinks / 2))
  const end = Math.min(total, start + maxLinks - 1)
  if (end - start + 1 < maxLinks) start = Math.max(1, end - maxLinks + 1)

  const links: number[] = []
  for (let p = start; p <= end; p++) {
    links.push(p)
  }
  return links
}
