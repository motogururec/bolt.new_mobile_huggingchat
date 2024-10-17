import { Injectable } from '@angular/core';
import { LocalNotifications } from '@nativescript/local-notifications';
import { getString, setBoolean, getBoolean } from '@nativescript/core/application-settings';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsEnabledKey = 'notificationsEnabled';

  constructor() {
    LocalNotifications.addOnMessageReceivedCallback(
      (notification) => {
        console.log('Notification received:', notification);
      }
    );
  }

  setNotificationsEnabled(enabled: boolean) {
    setBoolean(this.notificationsEnabledKey, enabled);
  }

  areNotificationsEnabled(): boolean {
    return getBoolean(this.notificationsEnabledKey, true);
  }

  async scheduleNotification(title: string, body: string) {
    if (this.areNotificationsEnabled()) {
      await LocalNotifications.schedule([
        {
          id: 1,
          title: title,
          body: body,
          badge: 1,
          at: new Date(Date.now() + 10 * 1000) // 10 seconds from now
        }
      ]);
    }
  }
}