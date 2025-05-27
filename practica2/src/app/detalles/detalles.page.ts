import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    RouterLink,
    IonInput,
    IonItem
  ]
})
export class DetallesPage {
  private route = inject(ActivatedRoute);

  nombre: string = this.route.snapshot.queryParams['nombre'] || '';
  edad: string = this.route.snapshot.queryParams['edad'] || '';
}
