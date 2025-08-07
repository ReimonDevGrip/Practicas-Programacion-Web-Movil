import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonToolbar,
  ModalController, 
  IonIcon,
  IonTitle } from '@ionic/angular/standalone';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'image-modal',
  templateUrl: 'image-modal.component.html',
  imports: [IonIcon, FormsModule, IonButton, IonButtons, IonContent, IonHeader, IonToolbar, IonTitle],
})
export class ImageModalComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private sanitizer = inject(DomSanitizer);

  @Input() imageUrl: string = '';
  
  safeImageUrl: SafeResourceUrl | undefined;

  constructor() { }

  ngOnInit() {
      this.safeImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}