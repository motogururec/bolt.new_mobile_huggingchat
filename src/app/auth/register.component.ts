import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <StackLayout class="p-4">
      <TextField [(ngModel)]="email" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" class="mb-4"></TextField>
      <TextField [(ngModel)]="password" hint="Password" secure="true" class="mb-4"></TextField>
      <Button text="Register" (tap)="onRegister()" class="mb-4"></Button>
      <Button text="Back to Login" (tap)="onBackToLogin()" class="mb-4"></Button>
    </StackLayout>
  `
})
export class RegisterComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService, private routerExtensions: RouterExtensions) {}

  onRegister() {
    this.authService.register(this.email, this.password)
      .then(() => this.routerExtensions.navigate(['/chat'], { clearHistory: true }))
      .catch(error => console.error('Registration error:', error));
  }

  onBackToLogin() {
    this.routerExtensions.back();
  }
}