import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IonIcon, ModalController, IonChip, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { imageOutline } from 'ionicons/icons';
import { ImageModalComponent } from '../image-modal/image-modal.component';
@Component({
  selector: 'show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss'],
  imports: [IonLabel, IonIcon, IonChip, IonLabel],
})
export class ShowImageComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() withClose: boolean = false;
  @Output() removed = new EventEmitter<void>();

  private modalCtrl = inject(ModalController);

  constructor() {
    addIcons({ imageOutline });
  }

  ngOnInit() {}

  async viewImage() {
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      componentProps: {
        imageUrl: this.imageUrl
      }
    });

    console.log(this.imageUrl)
    modal.present();
  }

  removeImage() {
    console.log('removing')
    this.removed.emit();
  }
}
