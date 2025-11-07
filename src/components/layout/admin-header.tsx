import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AdminHeader() {
  return (
    <header className="h-17 bg-card border-b border-border flex items-center justify-center px-6 gap-4">
      <div className="flex-1 max-w-xs">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Search events, users..."
            className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-foreground border rounded-full">
          <Bell size={20} />
        </Button>
      </div>
    </header>
  )
}
