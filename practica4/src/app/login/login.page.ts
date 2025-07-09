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
import { LoginService } from '../services/login-service/login.service';

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
  private loginService = inject(LoginService);
  private router = inject(Router);

  userId: string = '';
  showError: boolean = false;

  ngOnInit() {
    this.showError = false;

    if (this.loginService.checkIsLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    if (!this.userId || this.userId.trim() === '') {
      this.showError = true;
      return;
    }

    const user = this.userService.getUserById(this.userId);

    if (user) {
      this.loginService.login(user);
      this.router.navigate(['/home']);
    } else {
      this.showError = true;
    }
  }

  onInputChange() {
    this.showError = false;
  }
}