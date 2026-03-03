'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { AppShell } from '@aab/ui'
import { LayoutDashboard, Settings, User } from 'lucide-react'

export default function DashboardPage() {
  const t = useTranslations('common')
  const locale = useLocale()
  const router = useRouter()

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: t('nav.dashboard'), href: `/${locale}/dashboard`, active: true },
    { icon: <Settings size={18} />, label: t('nav.settings'), href: `/${locale}/settings` },
    { icon: <User size={18} />, label: t('nav.profile'), href: `/${locale}/profile` },
  ]

  return (
    <AppShell navItems={navItems} appName={t('app.name')} onNavigate={(href) => router.push(href)} t={t}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{t('nav.dashboard')}</h1>
          <p className="text-muted-foreground mt-1">{t('app.tagline')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6 space-y-2">
              <div className="w-8 h-8 rounded-md bg-primary/10" />
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-3 w-32 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
