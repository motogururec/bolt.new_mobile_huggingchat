import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-firestore';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  async enableOfflineSupport() {
    await firebase().firestore().enableNetwork();
  }

  async disableOfflineSupport() {
    await firebase().firestore().disableNetwork();
  }
}