import type { StorageAdapter } from './StorageAdapter.interface'

const TOKEN_KEY = 'aab_access_token'

export class CapacitorStorageAdapter implements StorageAdapter {
  async getToken(): Promise<string | null> {
    const { Preferences } = await import('@capacitor/preferences')
    const { value } = await Preferences.get({ key: TOKEN_KEY })
    return value
  }
  async setToken(token: string): Promise<void> {
    const { Preferences } = await import('@capacitor/preferences')
    await Preferences.set({ key: TOKEN_KEY, value: token })
  }
  async clearToken(): Promise<void> {
    const { Preferences } = await import('@capacitor/preferences')
    await Preferences.remove({ key: TOKEN_KEY })
  }
}
