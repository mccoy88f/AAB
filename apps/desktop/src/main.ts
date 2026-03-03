import { app, BrowserWindow, ipcMain, safeStorage } from 'electron'
import path from 'path'
import Store from 'electron-store'

const store = new Store()
const isDev = process.env['NODE_ENV'] === 'development'

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 800, minHeight: 600,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,   // ALWAYS true
      nodeIntegration: false,   // ALWAYS false
      sandbox: true,
    },
  })
  if (isDev) { win.loadURL('http://localhost:5173'); win.webContents.openDevTools() }
  else win.loadFile(path.join(__dirname, '../renderer/index.html'))
}

ipcMain.handle('get-token', () => {
  const encrypted = store.get('token') as Buffer | undefined
  if (!encrypted) return null
  try { return safeStorage.decryptString(Buffer.from(encrypted)) } catch { return null }
})
ipcMain.handle('set-token', (_, token: string) => {
  store.set('token', safeStorage.encryptString(token))
})
ipcMain.handle('clear-token', () => { store.delete('token') })

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
