import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonItem, IonLabel, IonInput, IonList,
  IonIcon, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { CategoryService } from '../../services/category';
import { ConfigService } from '../../services/remote-config';
import { AsyncPipe } from '@angular/common';
import { Category } from '../../models/todo.model';
import { ToastNotification } from '../../services/toast-notification';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonInput, IonList,
    IonIcon, IonGrid, IonRow, IonCol,
    FormsModule, CommonModule, AsyncPipe
  ]
})

export class CategoryManagerComponent implements OnInit {
  categoryName: string = '';
  selectedColor: string = '#3880ff';
  colors: string[] = ['#3880ff', '#2dd36f', '#ffc409', '#eb445a', '#92949c', '#7044ff'];
  isEditing: boolean = false;
  editingId: string | null = null;
  public configService = inject(ConfigService);

  constructor(public categoryService: CategoryService, private modalCtrl: ModalController, private notification: ToastNotification) {
  }

  ngOnInit() { }

  editCategory(cat: Category) {
    this.isEditing = true;
    this.editingId = cat.id;
    this.categoryName = cat.name;
    this.selectedColor = cat.color;
  }

  async saveCategory() {
    if (this.categoryName.trim().length > 0) {
      if (this.isEditing && this.editingId) {
        await this.categoryService.updateCategory(this.editingId, this.categoryName, this.selectedColor);
      } else {
        await this.categoryService.addCategory(this.categoryName, this.selectedColor);
      }
      this.resetForm();
    }
  }

  resetForm() {
    this.categoryName = '';
    this.selectedColor = '#3880ff';
    this.isEditing = false;
    this.editingId = null;
  }

  async deleteCategory(id: string) {
    await this.categoryService.deleteCategory(id);
    if (this.editingId === id) this.resetForm();
    this.notification.showToast('Categoria eliminada correctamente', 'success');

  }

  close() { this.modalCtrl.dismiss(); }
}