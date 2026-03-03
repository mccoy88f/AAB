import type { StorageAdapter } from './StorageAdapter.interface'

// On web the token lives in an httpOnly cookie managed by the server.
export class WebStorageAdapter implements StorageAdapter {
  async getToken(): Promise<string | null> { return null }
  async setToken(_token: string): Promise<void> {}
  async clearToken(): Promise<void> {}
}
