import { Component, inject, OnInit } from '@angular/core';
import { IonItem, IonLabel, IonList, IonSearchbar } from '@ionic/angular/standalone';
import { UserService } from '../services/users/users.service';
import { User } from '../models/users.model';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  imports: [IonItem, IonLabel, IonList, IonSearchbar],
})
export class SearchComponent implements OnInit {
  
  // private users = inject(UserService)
  public data = this.getUsers();
  public results = [...this.data];

  constructor(private users: UserService) { 
    console.log(this.users.getUsers())
  }
  ngOnInit() {
    console.log(this.data)
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.data.filter((d) => d.name.toLowerCase().includes(query));
  }

  getUsers(): User[] {
    console.log(this.users.getUsers())
    return this.users.getUsers();
  }
}
