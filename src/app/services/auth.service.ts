import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    firebase().initializeApp();
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await firebase().auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await firebase().auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await firebase().auth().signOut();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  getCurrentUser() {
    return firebase().auth().currentUser;
  }
}