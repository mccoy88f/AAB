import type { StorageAdapter } from './StorageAdapter.interface'

export class ElectronStorageAdapter implements StorageAdapter {
  async getToken(): Promise<string | null> {
    return (window as any).electronAPI.getToken()
  }
  async setToken(token: string): Promise<void> {
    return (window as any).electronAPI.setToken(token)
  }
  async clearToken(): Promise<void> {
    return (window as any).electronAPI.clearToken()
  }
}
