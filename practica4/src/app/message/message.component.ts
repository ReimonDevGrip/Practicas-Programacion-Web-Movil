
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Platform, IonItem, IonLabel, IonNote, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { Message } from '../models/message.model';
import { DataService } from '../services/data-service/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonItem, RouterLink, IonLabel, IonNote, IonIcon, IonItemSliding, IonItemOptions, IonItemOption],
})
export class MessageComponent {
  private platform = inject(Platform);
  private data = inject(DataService);
  private router = inject(Router);
  private alertController = inject(AlertController);

  @Input() message?: Message;
  @Output() messageDeleted = new EventEmitter<string>();

  isIos() {
    return this.platform.is('ios')
  }
  constructor() {
    addIcons({ chevronForward });
  }

  public markAsRead(id: string) {
    this.data.updateMessage(id, { read: true })
      .then(() => { this.router.navigateByUrl(`/message/${this.message?.id}`) })
      .catch(() => { console.log('No se marco como leido') })
  }

  public async deleteMessage(slidingItem: any) {
    const alert = await this.alertController.create({
      header: 'Messages',
      message: 'Do you want to delete the message?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'YES',
          handler: () => {
            this.confirmDelete(slidingItem);
          }
        }
      ]
    });

    await alert.present();
  }

  private confirmDelete(slidingItem: any) {
    if (this.message?.id) {
      this.data.deleteMessage(this.message.id)
        .then(() => {
          this.messageDeleted.emit(this.message!.id);
          slidingItem.close();
        })
        .catch((error) => {
          console.log('Error al eliminar el mensaje:', error);
          slidingItem.close();
        });
    }
  }
}
