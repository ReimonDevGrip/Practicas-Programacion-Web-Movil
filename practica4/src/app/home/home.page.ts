
import { Component, inject, OnInit } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonFab, IonFabButton, IonIcon, IonButtons, IonChip, IonAvatar, IonLabel, AlertController } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService } from '../services/data-service/data.service';
import { Message } from '../models/message.model';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent, IonFab, IonFabButton, IonIcon, RouterLink, IonButtons, IonChip, IonAvatar, IonLabel],
})
export class HomePage implements OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private data = inject(DataService);
  private alertController = inject(AlertController);

  userId: string | null = null;

  constructor() {
    addIcons({ add });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');

    if (this.userId) {
      this.data.setUserId(this.userId);
    }
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

  public async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure do you want to log out?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
        },
        {
          text: 'YES',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
