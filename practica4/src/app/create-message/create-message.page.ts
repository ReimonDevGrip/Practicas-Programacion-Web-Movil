import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonTextarea,
  IonButton, IonFooter, IonButtons, IonBackButton, IonNote, IonIcon, ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline, sendOutline } from 'ionicons/icons';
import { DataService } from '../services/data-service/data.service';
import { ModalComponent } from '../modal/modal.component';
import { User } from '../models/users.model';

@Component({
  selector: 'create-message',
  standalone: true,
  templateUrl: './create-message.page.html',
  styleUrls: ['./create-message.page.scss'],
  imports: [IonIcon, IonNote,
    CommonModule, ReactiveFormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonTextarea,
    IonButton, IonFooter, IonButtons, IonBackButton,
    MatFormFieldModule, MatInputModule,
    MatSelectModule, MatCheckboxModule,
    MatButtonModule
  ]
})
export class CreateMessage implements OnInit {
  private data = inject(DataService);
  private modalCtrl = inject(ModalController);
  nameOrEmail: string = '';
  messageForm!: FormGroup;
  submitted = false;
  searchActive = false;
  userSelected: User | null = null;
  isWriting = {
    email: false,
    subject: false,
    message: false
  };

  constructor(private fb: FormBuilder) {
    addIcons({ sendOutline, documentTextOutline })
  }

  ngOnInit() {
    this.messageForm = this.fb.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
    });

    modal.present();
    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm' && data?.user) {
      this.userSelected = data.user as User;

      this.messageForm.patchValue({
        email: this.userSelected.name
      });
    }
  }

  isInvalid(ctrl: string): boolean {
    const c = this.messageForm.get(ctrl)!;
    return c.invalid && (c.touched || this.submitted);
  }

  isValid(ctrl: string): boolean {
    const c = this.messageForm.get(ctrl)!;
    return c.valid && (c.dirty || c.touched);
  }

  showError(ctrl: string): boolean {
    return this.isInvalid(ctrl);
  }

  sendMessage(formDirective: any) {
    this.submitted = true;

    if (this.messageForm.invalid) return;

    console.log(this.userSelected)
    this.data.sendMessage(this.userSelected!, this.messageForm.value);

    console.log('Message sent:', this.messageForm.value);

    formDirective.resetForm();
    this.messageForm.reset();
    this.submitted = false;
    this.nameOrEmail = '';
  }

}
