import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Switch } from '@nativescript/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-settings',
  template: `
    <StackLayout class="p-4">
      <GridLayout rows="auto" columns="*, auto" class="mb-4">
        <Label text="Enable Push Notifications" col="0"></Label>
        <Switch [(ngModel)]="pushNotificationsEnabled" (checkedChange)="onPushNotificationsChange($event)" col="1"></Switch>
      </GridLayout>
      <Button text="Clear Chat History" (tap)="onClearHistory()" class="mb-4"></Button>
      <Button text="Logout" (tap)="onLogout()" class="mb-4"></Button>
      <Button text="Back to Chat" (tap)="onBackToChat()" class="mb-4"></Button>
    </StackLayout>
  `
})
export class SettingsComponent {
  pushNotificationsEnabled: boolean;

  constructor(
    private notificationService: NotificationService,
    private routerExtensions: RouterExtensions
  ) {
    this.pushNotificationsEnabled = this.notificationService.areNotificationsEnabled();
  }

  onPushNotificationsChange(args: any) {
    const sw = args.object as Switch;
    this.notificationService.setNotificationsEnabled(sw.checked);
  }

  onClearHistory() {
    // Implement clear history functionality
  }

  onLogout() {
    // Implement logout functionality
    this.routerExtensions.navigate(['/login'], { clearHistory: true });
  }

  onBackToChat() {
    this.routerExtensions.back();
  }
}