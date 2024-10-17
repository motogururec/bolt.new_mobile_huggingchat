import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://api-inference.huggingface.co/models/';

  constructor(private http: HttpClient) {}

  async sendMessage(message: string, model: string): Promise<string> {
    try {
      const response: any = await this.http.post(`${this.apiUrl}${model}`, { inputs: message }).toPromise();
      const aiResponse = response[0].generated_text;
      await this.saveMessageToFirestore(message, aiResponse, model);
      return aiResponse;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  private async saveMessageToFirestore(userMessage: string, aiResponse: string, model: string) {
    const user = firebase().auth().currentUser;
    if (user) {
      await firebase().firestore().collection('conversations').add({
        userId: user.uid,
        userMessage,
        aiResponse,
        model,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }

  async getMessages(): Promise<Array<{ sender: string, content: string }>> {
    const user = firebase().auth().currentUser;
    if (user) {
      const snapshot = await firebase().firestore()
        .collection('conversations')
        .where('userId', '==', user.uid)
        .orderBy('timestamp', 'desc')
        .limit(20)
        .get();

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return [
          { sender: 'User', content: data.userMessage },
          { sender: 'AI', content: data.aiResponse }
        ];
      }).flat();
    }
    return [];
  }

  async getConversationHistory(): Promise<Array<{ date: string, model: string, preview: string }>> {
    const user = firebase().auth().currentUser;
    if (user) {
      const snapshot = await firebase().firestore()
        .collection('conversations')
        .where('userId', '==', user.uid)
        .orderBy('timestamp', 'desc')
        .get();

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          date: data.timestamp.toDate().toLocaleString(),
          model: data.model,
          preview: data.userMessage.substring(0, 50) + '...'
        };
      });
    }
    return [];
  }
}