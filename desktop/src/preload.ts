import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getToken: (): Promise<string | null> => ipcRenderer.invoke('get-token'),
  setToken: (token: string): Promise<void> => ipcRenderer.invoke('set-token', token),
  clearToken: (): Promise<void> => ipcRenderer.invoke('clear-token'),
  platform: process.platform,
})
