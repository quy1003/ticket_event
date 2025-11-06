'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users } from 'lucide-react'
import Image from 'next/image'

const featuredEvents = [
  {
    id: 1,
    title: 'Hòa nhạc mùa hè 2025',
    category: 'Hòa nhạc',
    image: '/summer-music-concert-stage.jpg',
    date: '15 Tháng 6, 2025',
    location: 'Sân vận động Quốc gia',
    attendees: 5000,
    price: '250,000',
  },
  {
    id: 2,
    title: 'Hội thảo công nghệ AI',
    category: 'Công nghệ',
    image: '/technology-ai-conference-modern.jpg',
    date: '20 Tháng 6, 2025',
    location: 'Trung tâm hội nghị',
    attendees: 2000,
    price: '150,000',
  },
  {
    id: 3,
    title: 'Giải chạy marathon thành phố',
    category: 'Thể thao',
    image: '/marathon-running-race-athletes.jpg',
    date: '22 Tháng 6, 2025',
    location: 'Công viên trung tâm',
    attendees: 3000,
    price: '100,000',
  },
]

export default function Events() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Sự kiện nổi bật</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Các sự kiện được yêu thích nhất tuần này
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-card border-border"
              >
                {/* Event Image */}
                <div className="relative h-64 bg-muted overflow-hidden">
                  <Image
                    src={event.image || '/placeholder.svg'}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {event.category}
                  </div>
                </div>

                {/* Event Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground line-clamp-2">{event.title}</h3>

                  <div className="space-y-2 text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      <span>{event.attendees.toLocaleString()} người tham dự</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-xs text-foreground/60">Từ</span>
                      <p className="text-2xl font-bold text-primary">
                        {event.price.toLocaleString()}
                      </p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Đặt vé
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 bg-transparent"
            >
              Xem tất cả sự kiện →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
