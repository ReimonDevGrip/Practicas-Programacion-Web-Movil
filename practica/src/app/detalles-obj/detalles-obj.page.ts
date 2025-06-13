import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { Persona } from '../model/persona.model';

@Component({
  selector: 'app-detalles-obj',
  templateUrl: './detalles-obj.page.html',
  styleUrls: ['./detalles-obj.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class DetallesObjPage implements OnInit {
  router = inject(Router)
  persona? : Persona

  constructor() { 
    const nav = this.router.getCurrentNavigation();
    this.persona = nav?.extras.state as Persona;
  }

  ngOnInit() {
  }

}
