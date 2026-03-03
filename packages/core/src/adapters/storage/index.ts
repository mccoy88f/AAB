export type { StorageAdapter } from './StorageAdapter.interface'
export { ElectronStorageAdapter } from './ElectronStorageAdapter'
export { CapacitorStorageAdapter } from './CapacitorStorageAdapter'
export { WebStorageAdapter } from './WebStorageAdapter'

export function createStorageAdapter() {
  if (typeof window === 'undefined') {
    return new (require('./WebStorageAdapter').WebStorageAdapter)()
  }
  if ('Capacitor' in window) {
    return new (require('./CapacitorStorageAdapter').CapacitorStorageAdapter)()
  }
  if ('electronAPI' in window) {
    return new (require('./ElectronStorageAdapter').ElectronStorageAdapter)()
  }
  return new (require('./WebStorageAdapter').WebStorageAdapter)()
}
