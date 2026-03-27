import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastNotification } from './toast-notification'
import { checkmarkCircleOutline } from 'ionicons/icons';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private _storage: Storage | null = null
  private categorySubject = new BehaviorSubject<Category[]>([]);
  categories$: Observable<Category[]> = this.categorySubject.asObservable();

  constructor(private storage: Storage, private notification: ToastNotification) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const stored = await this._storage.get('categories') || [];
    this.categorySubject.next(stored);
  }

  async addCategory(name: string, color: string) {
    const current = this.categorySubject.value;
    const newCat: Category = {
      id: Date.now().toString(),
      name,
      color
    };
    const updated = [...current, newCat];

    this.categorySubject.next(updated);
    await this._storage?.set('categories', updated);
    this.notification.showToast(`Categoría "${name}" creada`);
  }

  async deleteCategory(id: string) {
    const updated = this.categorySubject.value.filter(c => c.id !== id);
    this.categorySubject.next(updated);
    await this._storage?.set('categories', updated);
  }

  getCategoryById(id: string): Category | undefined {
    return this.categorySubject.value.find(cat => cat.id === id);
  }

  async updateCategory(id: string, name: string, color: string) {
  const current = this.categorySubject.value;
  const updated = current.map(cat => 
    cat.id === id ? { ...cat, name, color } : cat
  );

  this.categorySubject.next(updated);
  await this._storage?.set('categories', updated);
  this.notification.showToast(`Categoría "${name}" actualizada`);
}

}
