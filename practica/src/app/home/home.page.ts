import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem
} from '@ionic/angular/standalone';
import { Persona } from '../model/persona.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonInput,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    RouterLink,
    FormsModule
  ],
})
export class HomePage {
  router = inject(Router);
  nombre: string = '';
  edad: number = 0;

  irConObj() {
    const persona: Persona = {
      nombre: this.nombre,
      edad: this.edad
    }

    this.router.navigate(['detalles-obj'], {
      state: persona
    })
  }
}
