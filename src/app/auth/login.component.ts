import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <StackLayout class="p-4">
      <TextField [(ngModel)]="email" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" class="mb-4"></TextField>
      <TextField [(ngModel)]="password" hint="Password" secure="true" class="mb-4"></TextField>
      <Button text="Login" (tap)="onLogin()" class="mb-4"></Button>
      <Button text="Register" (tap)="onRegister()" class="mb-4"></Button>
    </StackLayout>
  `
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService, private routerExtensions: RouterExtensions) {}

  onLogin() {
    this.authService.login(this.email, this.password)
      .then(() => this.routerExtensions.navigate(['/chat'], { clearHistory: true }))
      .catch(error => console.error('Login error:', error));
  }

  onRegister() {
    this.routerExtensions.navigate(['/register']);
  }
}