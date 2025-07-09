import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
  @Output('userObject') userSelected = new EventEmitter<User>();
  public selectedName: string = '';
  private userService = inject(UserService)
  public data: User[] = this.userService.users();
  public results = [...this.data];
  public selecUser: User | null = null;

  constructor() {
     effect(() => {
      this.data = this.userService.users();
      this.results = [...this.data];
    });
  }

  ngOnInit() {
  }
  
  handleInput(event: Event) {
    console.log(this.data)
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.data.filter((d) => d.name.toLowerCase().includes(query));
  }

  getSuggestName(user: User) {
    this.selecUser = user;
    this.selectedName = user.name;
    this.userSelected.emit(user);
  }

  sendInput() {
    if (this.selecUser)
      this.userSelected.emit(this.selecUser)
  }
}
