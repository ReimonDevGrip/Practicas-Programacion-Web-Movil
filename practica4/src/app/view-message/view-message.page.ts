
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonItem, IonIcon, IonLabel, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { DataService } from '../services/data.service';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonItem, IonIcon, IonLabel, IonNote],
})
export class ViewMessagePage implements OnInit {
  // public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  public messageId = ``;
  public message = computed(() =>
    this.data.messages().find(msg => msg.id === this.messageId))

  constructor() {
    addIcons({ personCircle });
    effect(() => {
      console.log('efecto');
      const msg = this.message();
      if (msg && !msg.read) {
        this.data.updateMessage(this.messageId, { read: true })
          .then(() => console.log('Message Updated'))
          .catch(err => console.log('Error updating Message ', err))
      }
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // this.message = this.data.getMessageById(parseInt(id, 10));
    this.messageId = id;
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }
}
