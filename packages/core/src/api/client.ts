import { createStorageAdapter } from '../adapters/storage'
import type { ApiError } from '@aab/types'

const storage = createStorageAdapter()
let isRefreshing = false

function getBaseUrl(): string {
  if (typeof process !== 'undefined' && process.env['VITE_API_URL']) return process.env['VITE_API_URL']
  return 'http://localhost:3000'
}

async function refreshToken(): Promise<string | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    if (!res.ok) return null
    const data = await res.json()
    await storage.setToken(data.accessToken)
    return data.accessToken as string
  } catch { return null }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await storage.getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> ?? {}),
  }

  const res = await fetch(`${getBaseUrl()}${path}`, { ...options, headers, credentials: 'include' })

  if (res.status === 401 && !isRefreshing) {
    isRefreshing = true
    const newToken = await refreshToken()
    isRefreshing = false
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`
      const retry = await fetch(`${getBaseUrl()}${path}`, { ...options, headers, credentials: 'include' })
      if (!retry.ok) throw await retry.json()
      return retry.json() as Promise<T>
    }
    await storage.clearToken()
    throw { error: 'Session expired', statusCode: 401 } satisfies ApiError
  }

  if (!res.ok) throw await res.json()
  return res.json() as Promise<T>
}

export const apiClient = {
  get:      <T>(path: string) => apiRequest<T>(path, { method: 'GET' }),
  post:     <T>(path: string, body: unknown) => apiRequest<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  patch:    <T>(path: string, body: unknown) => apiRequest<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete:   <T>(path: string) => apiRequest<T>(path, { method: 'DELETE' }),
  postForm: <T>(path: string, formData: FormData) => apiRequest<T>(path, { method: 'POST', body: formData, headers: {} }),
}
