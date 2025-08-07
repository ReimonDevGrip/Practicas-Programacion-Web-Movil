import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonFooter,
  IonButtons,
  IonBackButton,
  IonNote,
  IonIcon,
  IonSpinner,
  ModalController,
  LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Camera, CameraResultType} from '@capacitor/camera';
import { documentTextOutline, sendOutline } from 'ionicons/icons';
import { DataService } from '../services/data-service/data.service';
import { ModalComponent } from '../modal/modal.component';
import { User } from '../models/users.model';
import { GeminiService } from '../services/gemini-service/gemini-service.service';
import { ResponseIA } from '../models/response.model';
import { StorageService } from '../services/storage/storage.service';
import { ShowImageComponent } from '../show-image/show-image.component';

@Component({
  selector: 'create-message',
  standalone: true,
  templateUrl: './create-message.page.html',
  styleUrls: ['./create-message.page.scss'],
  imports: [
    IonIcon,
    IonNote,
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonFooter,
    IonButtons,
    IonBackButton,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    IonToolbar,
    MatButtonModule,
    IonSpinner,
    ShowImageComponent
  ],
})
export class CreateMessage implements OnInit {
  private data = inject(DataService);
  private modalCtrl = inject(ModalController);
  private geminiService = inject(GeminiService);
  private storageService = inject(StorageService);
  private loadingController = inject(LoadingController);

  nameOrEmail: string = '';
  messageForm!: FormGroup;
  submitted = false;
  searchActive = false;
  isEnchanting = false;
  userSelected: User | null = null;
  isWriting = {
    email: false,
    subject: false,
    message: false,
  };
  dataUrl : string = '';

  constructor(private fb: FormBuilder) {
    addIcons({ sendOutline, documentTextOutline });
  }

  ngOnInit() {
    this.messageForm = this.fb.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      imageUrl: ['']
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
        email: this.userSelected.name,
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
    if (this.dataUrl) this.messageForm.value.imageUrl = this.dataUrl;

    console.log(this.userSelected);
    this.data.sendMessage(this.userSelected!, this.messageForm.value);

    console.log('Message sent:', this.messageForm.value);

    formDirective.resetForm();
    this.messageForm.reset();
    this.submitted = false;
    this.nameOrEmail = '';
    this.dataUrl = '';
  }

  async enchantMessage() {
    try {
      const currentMessage = this.messageForm.get('message')?.value;
      
      if (!currentMessage?.trim()) {
        console.log('No hay mensaje para mejorar');
        return;
      }

      this.isEnchanting = true; // Activar estado de carga
      
      const prompt = `Mejora este mensaje, para que suene de manera elegante, si tiene groserias quitaselas y redactalo de forma el mensaje este redactado de forma elegante: "${currentMessage}"`;
      
      const response: ResponseIA = await this.geminiService.getResponse(prompt);
      console.log(response.response);
      
      this.messageForm.get('message')?.setValue(response.response);
      
    } catch (error) {
      console.error('Error al mejorar el mensaje:', error);
    } finally {
      this.isEnchanting = false; // Desactivar estado de carga siempre
    }
  }

  async takePhoto() {

    const loadModal = await this.loadingController.create({
      message: 'Upload Image...'
    });

    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    })

    loadModal.present();

    try {
      this.dataUrl = await this.storageService.uploadBase64Image(image.dataUrl!);
    } catch (error) {
      console.log('Error al guardar la imagen...', error)
    } finally {
      loadModal.dismiss();
    }

    console.log('Foto guardada en: ', this.dataUrl)
  }

}

