import { Injectable, signal, WritableSignal, computed, Signal } from '@angular/core';
import { User } from 'src/app/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser: WritableSignal<User | null> = signal<User | null>(null);
  
  constructor() {
  }

  public login(user: User): void {
    if (this.currentUser() !== user)
      this.currentUser.set(user);

    console.log(this.currentUser()?.email)
  }

  public logout(): void {
    this.currentUser.set(null);
  }

  public getCurrentUser(): User | null {
    return this.currentUser();
  }

  public getCurrentUserId(): string | null {
    const user = this.currentUser();
    return user ? user.id : null;
  }

  public checkIsLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  public updateUser(updatedUser: User): void {
    this.currentUser.set(updatedUser);
  }

}