
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonFab, IonFabButton, IonIcon, IonButtons, IonChip, IonAvatar, IonLabel, AlertController } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService } from '../services/data-service/data.service';
import { Message } from '../models/message.model';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../services/login-service/login.service';
import { User } from '../models/users.model';
import { GeminiService } from '../services/gemini-service/gemini-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent, IonFab, IonFabButton, IonIcon, RouterLink, IonButtons, IonChip, IonAvatar, IonLabel],
})
export class HomePage implements OnInit {
  private iaService = inject(GeminiService);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private data = inject(DataService);
  private alertController = inject(AlertController);
  public currentUser: User | null = null;
  private refreshTrigger = signal(0);

  public messages = computed(() => {
    this.refreshTrigger();
    return this.data.getMessages();
  });

  constructor() {
    addIcons({ add });
  }

  ngOnInit() {
    if (!this.loginService.checkIsLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.currentUser = this.loginService.getCurrentUser();
    this.data.setUserId(this.currentUser!.email);

    
  }


  async refresh(ev: any) {
    this.currentUser = this.loginService.getCurrentUser();
    this.data.setUserId(this.currentUser!.email);

    this.data.getMessages();

    this.refreshTrigger.set(this.refreshTrigger() + 1);

    const response = await this.iaService.getResponse('Porque consideras a Roger Federer el mejor tenista si no es el que tiene mas grand slams');

    console.log(response);
  }

  getMessages(): Message[] {
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
            this.loginService.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}
