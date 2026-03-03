import { create } from 'zustand'
import { apiClient } from '../api/client'
import { createStorageAdapter } from '../adapters/storage'
import type { User, AuthResponse, LoginPayload, RegisterPayload } from '@aab/types'

const storage = createStorageAdapter()

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login(payload: LoginPayload): Promise<void>
  register(payload: RegisterPayload): Promise<void>
  logout(): Promise<void>
  fetchMe(): Promise<void>
  clearError(): void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (payload) => {
    set({ loading: true, error: null })
    try {
      const res = await apiClient.post<AuthResponse>('/auth/login', payload)
      await storage.setToken(res.accessToken)
      set({ user: res.user, isAuthenticated: true, loading: false })
    } catch (err: any) {
      set({ loading: false, error: err?.error ?? 'Login failed' })
      throw err
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null })
    try {
      const res = await apiClient.post<AuthResponse>('/auth/register', payload)
      await storage.setToken(res.accessToken)
      set({ user: res.user, isAuthenticated: true, loading: false })
    } catch (err: any) {
      set({ loading: false, error: err?.error ?? 'Registration failed' })
      throw err
    }
  },

  logout: async () => {
    try { await apiClient.post('/auth/logout', {}) } finally {
      await storage.clearToken()
      set({ user: null, isAuthenticated: false })
    }
  },

  fetchMe: async () => {
    set({ loading: true })
    try {
      const user = await apiClient.get<User>('/auth/me')
      set({ user, isAuthenticated: true, loading: false })
    } catch {
      await storage.clearToken()
      set({ user: null, isAuthenticated: false, loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
