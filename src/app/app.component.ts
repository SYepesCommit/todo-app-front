import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { trashOutline, addOutline,reorderThreeOutline ,checkmarkCircleOutline, createOutline, closeOutline, settingsOutline,addCircleOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ConfigService } from './services/remote-config';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private configService: ConfigService) {
    addIcons({
      'trash-outline': trashOutline,
      'add-outline': addOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'create-outline': createOutline,
      'close-outline': closeOutline,
      'settings-outline': settingsOutline,
      'add-circle-outline': addCircleOutline,
      'reorder-three-outline': reorderThreeOutline
    });
  }
}
