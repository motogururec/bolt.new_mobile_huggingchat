import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ChatService } from '../services/chat.service';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-chat',
  template: `
    <StackLayout class="p-4">
      <Label [text]="'Current Model: ' + currentModel" class="mb-4"></Label>
      <ListView [items]="messages" class="mb-4">
        <ng-template let-item="item">
          <StackLayout>
            <Label [text]="item.sender + ': ' + item.content" textWrap="true"></Label>
          </StackLayout>
        </ng-template>
      </ListView>
      <TextField [(ngModel)]="userInput" hint="Type your message" returnKeyType="send" (returnPress)="sendMessage()" class="mb-4"></TextField>
      <Button text="Send" (tap)="sendMessage()" class="mb-4"></Button>
      <Button text="Change Model" (tap)="onChangeModel()" class="mb-4"></Button>
      <Button text="View History" (tap)="onViewHistory()" class="mb-4"></Button>
      <Button text="Settings" (tap)="onSettings()" class="mb-4"></Button>
    </StackLayout>
  `
})
export class ChatComponent implements OnInit {
  messages: Array<{ sender: string, content: string }> = [];
  userInput: string;
  currentModel: string;

  constructor(
    private chatService: ChatService,
    private modelService: ModelService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit() {
    this.currentModel = this.modelService.getCurrentModel();
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages().then(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.userInput) {
      this.chatService.sendMessage(this.userInput, this.currentModel)
        .then(response => {
          this.messages.push({ sender: 'User', content: this.userInput });
          this.messages.push({ sender: 'AI', content: response });
          this.userInput = '';
        })
        .catch(error => console.error('Error sending message:', error));
    }
  }

  onChangeModel() {
    this.routerExtensions.navigate(['/model-selection']);
  }

  onViewHistory() {
    this.routerExtensions.navigate(['/history']);
  }

  onSettings() {
    this.routerExtensions.navigate(['/settings']);
  }
}