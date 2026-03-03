import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@aab/core'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})
type FormData = z.infer<typeof schema>

interface RegisterFormProps {
  onSuccess?: () => void
  onLoginClick?: () => void
  t: (key: string) => string
}

export function RegisterForm({ onSuccess, onLoginClick, t }: RegisterFormProps) {
  const { register: registerUser, loading, error, clearError } = useAuthStore()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    clearError()
    try { await registerUser(data); onSuccess?.() } catch {}
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('register.title')}</h1>
        <p className="text-muted-foreground">{t('register.subtitle')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">{t('register.name')}</label>
          <input type="text" placeholder={t('register.name_placeholder')}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register('name')} />
          {errors.name && <p className="text-xs text-destructive">{t('errors.required')}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">{t('register.email')}</label>
          <input type="email" placeholder={t('register.email_placeholder')}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register('email')} />
          {errors.email && <p className="text-xs text-destructive">{t('errors.invalid_email')}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">{t('register.password')}</label>
          <input type="password" placeholder={t('register.password_placeholder')}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register('password')} />
          {errors.password && <p className="text-xs text-destructive">{t('errors.weak_password')}</p>}
        </div>
        {error && (
          <div className="px-3 py-2 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
        <button type="submit" disabled={loading}
          className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
          {loading ? t('register.loading') : t('register.submit')}
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {t('register.login_link')}{' '}
        <button onClick={onLoginClick} className="text-primary font-medium hover:underline">
          {t('register.login_cta')}
        </button>
      </p>
    </div>
  )
}
