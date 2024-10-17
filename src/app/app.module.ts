import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { NativeScriptHttpClientModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ChatComponent } from './chat/chat.component';
import { ModelSelectionComponent } from './model-selection/model-selection.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';

import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { ModelService } from './services/model.service';
import { OfflineService } from './services/offline.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    ModelSelectionComponent,
    HistoryComponent,
    SettingsComponent
  ],
  providers: [
    AuthService,
    ChatService,
    ModelService,
    OfflineService,
    NotificationService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}