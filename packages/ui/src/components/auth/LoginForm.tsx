import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@aab/core'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
type FormData = z.infer<typeof schema>

interface LoginFormProps {
  onSuccess?: () => void
  onRegisterClick?: () => void
  t: (key: string) => string
}

export function LoginForm({ onSuccess, onRegisterClick, t }: LoginFormProps) {
  const { login, loading, error, clearError } = useAuthStore()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    clearError()
    try { await login(data); onSuccess?.() } catch {}
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('login.title')}</h1>
        <p className="text-muted-foreground">{t('login.subtitle')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">{t('login.email')}</label>
          <input type="email" placeholder={t('login.email_placeholder')}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register('email')} />
          {errors.email && <p className="text-xs text-destructive">{t('errors.invalid_email')}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">{t('login.password')}</label>
          <input type="password" placeholder={t('login.password_placeholder')}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register('password')} />
          {errors.password && <p className="text-xs text-destructive">{t('errors.weak_password')}</p>}
        </div>
        {error && (
          <div className="px-3 py-2 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{t('errors.invalid_credentials')}</p>
          </div>
        )}
        <button type="submit" disabled={loading}
          className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
          {loading ? t('login.loading') : t('login.submit')}
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {t('login.register_link')}{' '}
        <button onClick={onRegisterClick} className="text-primary font-medium hover:underline">
          {t('login.register_cta')}
        </button>
      </p>
    </div>
  )
}
