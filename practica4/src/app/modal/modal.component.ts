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



  constructor(private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(name?: string | null, user?: User) {
    if (name)
      return this.modalCtrl.dismiss({name : name});
    else
      return this.modalCtrl.dismiss({user : user});

  }

  getName(name: string) {
    this.confirm(name);
  }

  getUserObject(user: User) {
    this.confirm(null, user);
  }
}