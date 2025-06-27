
import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService } from '../services/data.service';
import { Message } from '../models/message.model';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent, IonFab, IonFabButton, IonIcon, RouterLink],
})
export class HomePage {
  private data = inject(DataService);
  constructor() {
    addIcons({ add });
  }

  refresh(ev: any) {
    this.getMessages();
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    // const messages = this.data.getMessages();
    
    // return messages.length > 0 ? messages : false
    return this.data.getMessages();

  }
}
