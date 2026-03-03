import { useState, type ReactNode } from 'react'
import { useAuthStore } from '@aab/core'

export interface NavItem {
  icon: ReactNode
  label: string
  href: string
  active?: boolean
}

interface SidebarProps {
  items: NavItem[]
  appName: string
  onNavigate: (href: string) => void
  collapsed?: boolean
}

export function Sidebar({ items, appName, onNavigate, collapsed = false }: SidebarProps) {
  return (
    <aside className={`flex flex-col h-full bg-card border-r border-border transition-all duration-200 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground font-bold text-sm">{appName.charAt(0)}</span>
        </div>
        {!collapsed && <span className="font-semibold text-foreground truncate">{appName}</span>}
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <button key={item.href} onClick={() => onNavigate(item.href)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${item.active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
              ${collapsed ? 'justify-center' : ''}`}>
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  )
}

interface AppShellProps {
  children: ReactNode
  navItems: NavItem[]
  appName: string
  onNavigate: (href: string) => void
  t: (key: string) => string
}

export function AppShell({ children, navItems, appName, onNavigate, t }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`fixed inset-y-0 left-0 z-30 lg:relative lg:z-auto transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar items={navItems} appName={appName}
          onNavigate={(href) => { onNavigate(href); setSidebarOpen(false) }}
          collapsed={sidebarCollapsed} />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card h-14 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 rounded-md hover:bg-muted" onClick={() => setSidebarOpen(true)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="hidden lg:block p-1.5 rounded-md hover:bg-muted" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.name}</span>
            <button onClick={() => logout()} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.logout')}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
