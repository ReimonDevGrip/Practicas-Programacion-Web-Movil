import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonFooter
} from '@ionic/angular/standalone';
import { UserService } from '../services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    IonFooter
  ]
})
export class LoginPage implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  userId: string = '';
  showError: boolean = false;

  ngOnInit() {
    this.showError = false;
  }

  onLogin() {
    if (!this.userId || this.userId.trim() === '') {
      this.showError = true;
      return;
    }

    if (this.userService.userExists(this.userId)) {
      // Usuario existe, navegar a home
      this.router.navigate(['/home', this.userId]);
    } else {
      // Usuario no existe, mostrar mensaje de error
      this.showError = true;
    }
  }

  onInputChange() {
    // Ocultar el error cuando el usuario empiece a escribir
    this.showError = false;
  }
}