import { Injectable } from '@angular/core';
import { getString, setString } from '@nativescript/core/application-settings';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private currentModelKey = 'currentModel';
  private defaultModel = 'gpt2';

  setCurrentModel(model: string) {
    setString(this.currentModelKey, model);
  }

  getCurrentModel(): string {
    return getString(this.currentModelKey, this.defaultModel);
  }

  async getAvailableModels(): Promise<string[]> {
    // In a real app, you might fetch this from an API
    return ['gpt2', 'bert-base-uncased', 'roberta-base', 'distilbert-base-uncased'];
  }
}