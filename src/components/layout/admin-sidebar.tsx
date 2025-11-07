import Link from 'next/link'
import { LayoutDashboard, Calendar, Users, BarChart3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminSidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Calendar, label: 'Events', href: '/admin/events' },
    { icon: Users, label: 'Attendees', href: '/admin/users' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  return (
    <>
      <aside
        className={`w-20 bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-sidebar-foreground"></Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors">
                <item.icon size={20} />
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border"></div>
      </aside>
    </>
  )
}
