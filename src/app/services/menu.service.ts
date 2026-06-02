import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, addDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MenuItem {
  id?: number | string;
  name: string;
  description: string;
  price: number;
  spicyLevel?: number;
  hasOptions?: boolean;
}

export interface MenuCategory {
  id?: string;
  title: string;
  items: MenuItem[];
  order?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private firestore: Firestore = inject(Firestore);

  // Haal alle categorieën op, gesorteerd op 'order'
  getCategories(): Observable<MenuCategory[]> {
    const categoriesRef = collection(this.firestore, 'menuCategories');
    return (collectionData(categoriesRef, { idField: 'id' }) as Observable<MenuCategory[]>).pipe(
      map(categories => categories.sort((a, b) => (a.order || 0) - (b.order || 0)))
    );
  }

  async updateCategory(categoryId: string, data: Partial<MenuCategory>) {
    const categoryRef = doc(this.firestore, `menuCategories/${categoryId}`);
    return updateDoc(categoryRef, data as any);
  }

  async addCategory(category: MenuCategory) {
    const categoriesRef = collection(this.firestore, 'menuCategories');
    return addDoc(categoriesRef, category as any);
  }
  
  // Eenmalige functie om de database te vullen als deze leeg is
  async seedDatabase(initialData: MenuCategory[]) {
    const categoriesRef = collection(this.firestore, 'menuCategories');
    for (const [index, cat] of initialData.entries()) {
      cat.order = index;
      await addDoc(categoriesRef, cat as any);
    }
  }
}
