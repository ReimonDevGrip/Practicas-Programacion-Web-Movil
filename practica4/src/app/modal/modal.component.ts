import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { User } from '../models/users.model';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  imports: [FormsModule, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, SearchComponent],
})
export class ModalComponent {
  userSelect: User | undefined = undefined;

  constructor(private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(user?: User) {
    console.log(user)
    return user
      ? this.modalCtrl.dismiss({ user: user }, 'confirm')
      : this.modalCtrl.dismiss('', 'cancel')
  }

  getUserObject(user: User) {
   this.userSelect = user;
  }
}