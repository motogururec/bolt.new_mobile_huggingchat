import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ChatComponent } from './chat/chat.component';
import { ModelSelectionComponent } from './model-selection/model-selection.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'model-selection', component: ModelSelectionComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}