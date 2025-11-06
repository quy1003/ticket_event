import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  attendees: number
  image?: string
  price?: number
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const categoryColors: Record<string, string> = {
    technology: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    music: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    sports: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    business: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    education: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    entertainment: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  }

  const categoryColor =
    categoryColors[event.category.toLowerCase()] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/30">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <Calendar className="h-12 w-12 text-primary/40" />
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={categoryColor}>{event.category}</Badge>
        </div>
        {/* Price Tag */}
        {event.price !== undefined && (
          <div className="absolute top-3 right-3 rounded-lg bg-primary/90 px-3 py-1 text-sm font-semibold text-primary-foreground backdrop-blur-sm">
            {event.price === 0 ? 'Miễn phí' : `${event.price.toLocaleString()}đ`}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>

        {/* Event Details */}
        <div className="mb-4 space-y-2">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
            <span>
              {event.date} • {event.time}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 flex-shrink-0 text-primary" />
            <span>{event.attendees} người tham dự</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/events/${event.id}`} className="block">
          <Button className="w-full" variant="default" size="sm">
            Xem chi tiết
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
