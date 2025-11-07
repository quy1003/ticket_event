'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center font-bold text-xl text-foreground hover:text-primary transition-colors"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden relative">
              <Image
                src="/header_icon.jpg"
                alt="Biểu tượng sự kiện"
                fill
                className="object-cover"
              />
            </div>
            <span>Selten Event</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/events" className="text-foreground hover:text-primary transition-colors">
              Tất cả sự kiện
            </Link>
            <Link
              href="/categories"
              className="text-foreground hover:text-primary transition-colors"
            >
              Danh mục
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              Về chúng tôi
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline">Đăng nhập</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Đăng ký
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
            <Link href="/events" className="block text-foreground hover:text-primary py-2">
              Tất cả sự kiện
            </Link>
            <Link href="/categories" className="block text-foreground hover:text-primary py-2">
              Danh mục
            </Link>
            <Link href="/about" className="block text-foreground hover:text-primary py-2">
              Về chúng tôi
            </Link>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent">
                Đăng nhập
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground">Đăng ký</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
