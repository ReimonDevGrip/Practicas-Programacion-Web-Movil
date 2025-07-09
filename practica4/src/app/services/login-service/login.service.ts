// import { Injectable, signal, WritableSignal, computed, Signal } from '@angular/core';
// import { User } from 'src/app/models/users.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   private currentUser: WritableSignal<User | null> = signal<User | null>(null);
  
//   constructor() {
//   }

//   public login(user: User): void {
//     if (this.currentUser() !== user)
//       this.currentUser.set(user);

//     console.log(this.currentUser()?.email)
//   }

//   public logout(): void {
//     this.currentUser.set(null);
//   }

//   public getCurrentUser(): User | null {
//     return this.currentUser();
//   }

//   public getCurrentUserId(): string | null {
//     const user = this.currentUser();
//     return user ? user.id : null;
//   }

//   public checkIsLoggedIn(): boolean {
//     return this.currentUser() !== null;
//   }

//   public updateUser(updatedUser: User): void {
//     this.currentUser.set(updatedUser);
//   }

// }

import { Injectable, signal, WritableSignal, computed, Signal } from '@angular/core';
import { User } from 'src/app/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly STORAGE_KEY = 'currentUser';
  private currentUser: WritableSignal<User | null> = signal<User | null>(null);
  
  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    try {
      const storedUser = localStorage.getItem(this.STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        this.currentUser.set(user);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  private saveUserToStorage(user: User | null): void {
    try {
      if (user) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }

  public login(user: User): void {
    if (this.currentUser() !== user) {
      this.currentUser.set(user);
      this.saveUserToStorage(user);
    }
    console.log(this.currentUser()?.email);
  }

  public logout(): void {
    this.currentUser.set(null);
    this.saveUserToStorage(null);
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
    this.saveUserToStorage(updatedUser);
  }

  public clearStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUser.set(null);
  }
}