import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from './services/auth.service';
import { OfflineService } from './services/offline.service';

@Component({
  selector: 'ns-app',
  template: '<page-router-outlet></page-router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions,
    private offlineService: OfflineService
  ) {}

  ngOnInit() {
    this.offlineService.enableOfflineSupport();
    this.checkAuthState();
  }

  private checkAuthState() {
    if (this.authService.getCurrentUser()) {
      this.routerExtensions.navigate(['/chat'], { clearHistory: true });
    } else {
      this.routerExtensions.navigate(['/login'], { clearHistory: true });
    }
  }
}