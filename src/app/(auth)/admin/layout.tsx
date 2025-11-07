'use client'

import React from 'react'
import { AdminHeader } from '@/components/layout/admin-header'
import { AdminSidebar } from '@/components/layout/admin-sidebar'

type Props = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
