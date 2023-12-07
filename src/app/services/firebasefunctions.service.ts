import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { ToastService } from '../services/toast.service';
import { RepositoryService } from '../services/repository.service';
import { Router } from '@angular/router';
import { auth } from '../firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFunctionsService {
  userCredentials?: UserCredential;

  constructor(
    private toastService: ToastService,
    private repositoryService: RepositoryService,
    private router: Router
  ) {}

  async createUser(
    email: string,
    password: string
  ): Promise<UserCredential | null> {
    try {
      this.userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return this.userCredentials;
    } catch (e: any) {
      const error: string = e.code;
      switch (error) {
        case 'auth/email-already-in-use':
          this.toastService.show('Deze E-mail adres in al ingebruik');
          break;
        case 'auth/invalid-email':
          this.toastService.show('onjuiste E-mail adress');
          break;
        case 'auth/weak-password':
          this.toastService.show(
            'Wachtwoord is niet sterk genoeg. Wachtwoord moet minimaal 6 tekens zijn'
          );
          break;
        default:
          this.toastService.show(
            'Oeps! Er is iets verkeerd gegaan. Probeer het later nog een keer'
          );
      }
      return null;
    }
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<UserCredential | null> {
    try {
      this.userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return this.userCredentials;
    } catch (e: any) {
      const error: string = e.code;
      console.log(error);

      switch (error) {
        case 'auth/invalid-email':
          this.toastService.show('onjuiste E-mail adress');
          break;
        case 'auth/invalid-credential':
          this.toastService.show('inloggegevens ongeldig');
          break;
        case 'auth/user-disabled':
          this.toastService.show('Deze user is geblokkeerd');
          break;
        case 'auth/INVALID_LOGIN_CREDENTIALS':
          this.toastService.show('Onjuiste email of wachtwoord gegevens');
          break;
        default:
          this.toastService.show(
            'Oeps! Er is iets verkeerd gegaan. Probeer het later nog een keer'
          );
      }
    }
    return null;
  }

  async logout(userId: string) {
    try {
      await signOut(auth);
      localStorage.removeItem('userId');
      this.repositoryService.usersCollection.doc(userId).update({
        isOnline: false,
      });
      this.router.navigate(['/']);
    } catch (e) {
      this.toastService.show(
        'Oeps! Er is iets verkeerd gegaan. Probeer het later nog een keer'
      );
    }
  }
}
