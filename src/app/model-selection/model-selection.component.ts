import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-model-selection',
  template: `
    <StackLayout class="p-4">
      <ListView [items]="models" class="mb-4">
        <ng-template let-item="item">
          <StackLayout>
            <Label [text]="item" (tap)="selectModel(item)" class="p-2"></Label>
          </StackLayout>
        </ng-template>
      </ListView>
      <Button text="Back to Chat" (tap)="onBackToChat()" class="mb-4"></Button>
    </StackLayout>
  `
})
export class ModelSelectionComponent implements OnInit {
  models: string[] = [];

  constructor(private modelService: ModelService, private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    this.modelService.getAvailableModels().then(models => {
      this.models = models;
    });
  }

  selectModel(model: string) {
    this.modelService.setCurrentModel(model);
    this.onBackToChat();
  }

  onBackToChat() {
    this.routerExtensions.back();
  }
}