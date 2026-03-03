'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@aab/ui'

export default function LoginPage() {
  const t = useTranslations('auth')
  const locale = useLocale()
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <LoginForm
          t={t}
          onSuccess={() => router.push(`/${locale}/dashboard`)}
          onRegisterClick={() => router.push(`/${locale}/register`)}
        />
      </div>
    </div>
  )
}
