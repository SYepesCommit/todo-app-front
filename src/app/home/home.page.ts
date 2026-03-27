import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonInput,
  IonButton, IonIcon, IonCheckbox, IonItemOption,
  IonButtons, IonSelect, IonSelectOption, ToastController,
  IonItemOptions, IonItemSliding, IonBadge, IonListHeader, IonSegment, IonSegmentButton,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/task';
import { ModalController } from '@ionic/angular/standalone';
import { ToastNotification } from '../services/toast-notification'
import { CategoryService } from '../services/category';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonList, IonSelect, IonSelectOption, IonBadge,
    IonButton, IonIcon, IonCheckbox, IonItemOption, IonListHeader,
    IonItemOptions, IonItemSliding,
    FormsModule, CommonModule
  ],
})
export class HomePage {
  newTaskTitle: string = '';
  selectedCategoryId: string = '';
  constructor(public todoService: TodoService, private modalCtrl: ModalController,
    public categoryService: CategoryService, private notification: ToastNotification) {
  }

  async openCategories() {
    const { CategoryManagerComponent } = await import('../components/category-manager/category-manager.component');
    const modal = await this.modalCtrl.create({
      component: CategoryManagerComponent,
    });

    await modal.present();
  }

  changeFilter(event: any) {
    const categoryId = event.detail.value;
    this.todoService.setFilter(categoryId || null);
  }

  addTask() {
    const title = this.newTaskTitle.trim();

    if (title.length === 0) {
      this.notification.showToast('Por favor, escribe una tarea', 'warning');
      return;
    }

    if (!this.selectedCategoryId) {
      this.notification.showToast('Debes seleccionar una categoría para continuar', 'danger');
      return;
    }

    this.todoService.addTasks({
      title: title,
      categoryId: this.selectedCategoryId
    });

    this.newTaskTitle = '';
    this.selectedCategoryId = '';
    this.notification.showToast('Tarea agregada correctamente', 'success');
  }

  deleteTask(id: string) {
    this.todoService.deleteTask({ id });
    this.notification.showToast('Tarea eliminada correctamente', 'success');
  }

  toggleTask(id: string) {
    this.todoService.toggleTask({ id });
  }

  getCategoryName(id: string) {
    const cat = this.categoryService.getCategoryById(id);
    return cat ? cat.name : 'Sin categoría';
  }

  getCategoryColor(id: string) {
    const cat = this.categoryService.getCategoryById(id);
    return cat ? cat.color : 'grey';
  }
}