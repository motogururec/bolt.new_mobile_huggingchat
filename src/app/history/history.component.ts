import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-history',
  template: `
    <StackLayout class="p-4">
      <ListView [items]="conversations" class="mb-4">
        <ng-template let-item="item">
          <StackLayout>
            <Label [text]="'Date: ' + item.date" class="font-bold"></Label>
            <Label [text]="'Model: ' + item.model" class="font-italic"></Label>
            <Label [text]="'Preview: ' + item.preview" textWrap="true"></Label>
          </StackLayout>
        </ng-template>
      </ListView>
      <Button text="Back to Chat" (tap)="onBackToChat()" class="mb-4"></Button>
    </StackLayout>
  `
})
export class HistoryComponent implements OnInit {
  conversations: Array<{ date: string, model: string, preview: string }> = [];

  constructor(private chatService: ChatService, private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    this.loadConversations();
  }

  loadConversations() {
    this.chatService.getConversationHistory().then(history => {
      this.conversations = history;
    });
  }

  onBackToChat() {
    this.routerExtensions.back();
  }
}