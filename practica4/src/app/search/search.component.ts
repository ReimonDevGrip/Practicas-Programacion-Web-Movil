import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
  @Output('name') nameValue = new EventEmitter<string>();
  public selectedName: string = '';
  private users = inject(UserService)
  public data = this.getUsers();
  public results = [...this.data];
  public selecUser: User | null = null;

  constructor() {
  }

  ngOnInit() {
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.data.filter((d) => d.name.toLowerCase().includes(query));
  }

  getUsers(): User[] {
    return this.users.getUsers();
  }

  getSuggestName(user: User) {
    this.selecUser = user;
    this.selectedName = user.name;
  }

  sendInput() {
    if (this.selecUser)
      this.userSelected.emit(this.selecUser)
    this.nameValue.emit(this.selectedName);
  }
}
