import { Injectable } from '@angular/core';
import {
  ToastController
} from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ToastNotification {


  constructor(private toastNotificationController: ToastController) { }

  async showToast(message: string, color: string = 'success', icon?: string) {
    const toast = await this.toastNotificationController.create({
      message,
      duration: 3500,
      color,
      position: 'bottom',
      icon: icon || 'checkmark-circle-outline',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }
}
