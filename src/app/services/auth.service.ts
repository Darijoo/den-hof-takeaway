import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, updatePassword, authState, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  // Observable van de huidige ingelogde gebruiker
  readonly authState$: Observable<User | null> = authState(this.auth);

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  login(email: string, wachtwoord: string) {
    return signInWithEmailAndPassword(this.auth, email, wachtwoord);
  }

  logout() {
    return signOut(this.auth);
  }

  async veranderWachtwoord(nieuwWachtwoord: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      return updatePassword(user, nieuwWachtwoord);
    } else {
      throw new Error('Geen gebruiker ingelogd');
    }
  }
}
