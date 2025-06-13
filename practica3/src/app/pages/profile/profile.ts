import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonModal,
  IonButtons,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonToggle, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'user-data',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  standalone: true,
  imports: [IonInput,
    IonLabel,
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    IonAvatar,
    IonModal,
    IonItem,
    IonList,
    IonToggle,
    IonButton,
    IonToolbar,
    IonTitle,
    IonButtons,
  ],
})
export class Profile implements OnInit {
  public photo: string = 'assets/images.webp';
  public name: string = 'ReimonGrip';
  public email: string = 'reimon@gmail.com';
  public jobRole: string = 'Backend Developer';

  constructor() {}

  ngOnInit() {}

  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {

  }

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.photo = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}
}