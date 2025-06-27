
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Platform, IonItem, IonLabel, IonNote, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { Message } from '../models/message.model';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ IonItem, RouterLink, IonLabel, IonNote, IonIcon],
})
export class MessageComponent {
  private platform = inject(Platform);
  private data = inject(DataService);
  private router  = inject(Router);

  @Input() message?: Message;
  isIos() {
    return this.platform.is('ios')
  }
  constructor() {
    addIcons({ chevronForward });
  }

  public markAsRead(id: string) {
    this.data.updateMessage(id, { read: true })
      .then(() => { this.router.navigateByUrl(`/message/${this.message?.id}`)})
      .catch(() => { console.log('No se marco como leido')})
  }
}
