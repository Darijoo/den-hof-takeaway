import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface AppSettings {
  address: string;
  phone: string;
  openingHours: string;
  openingHoursExtra: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private firestore: Firestore = inject(Firestore);

  getSettings(): Observable<AppSettings | undefined> {
    const settingsRef = doc(this.firestore, 'settings/general');
    return docData(settingsRef) as Observable<AppSettings | undefined>;
  }

  async updateSettings(settings: AppSettings) {
    const settingsRef = doc(this.firestore, 'settings/general');
    return setDoc(settingsRef, settings, { merge: true });
  }
}
