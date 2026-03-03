export interface NotificationAdapter {
  requestPermission(): Promise<boolean>
  send(title: string, body: string): Promise<void>
}

export class WebNotificationAdapter implements NotificationAdapter {
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false
    const result = await Notification.requestPermission()
    return result === 'granted'
  }
  async send(title: string, body: string): Promise<void> {
    if (Notification.permission === 'granted') new Notification(title, { body })
  }
}

export class CapacitorNotificationAdapter implements NotificationAdapter {
  async requestPermission(): Promise<boolean> {
    const { LocalNotifications } = await import('@capacitor/local-notifications')
    const { display } = await LocalNotifications.requestPermissions()
    return display === 'granted'
  }
  async send(title: string, body: string): Promise<void> {
    const { LocalNotifications } = await import('@capacitor/local-notifications')
    await LocalNotifications.schedule({
      notifications: [{ title, body, id: Date.now() }],
    })
  }
}

export function createNotificationAdapter(): NotificationAdapter {
  if (typeof window !== 'undefined' && 'Capacitor' in window) {
    return new CapacitorNotificationAdapter()
  }
  return new WebNotificationAdapter()
}
