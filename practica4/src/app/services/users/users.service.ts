import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { collectionData, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private firestore = inject(Firestore);
    private useRef: CollectionReference<DocumentData> = collection(this.firestore, 'users');

    private users$ = collectionData(this.useRef, { idField: 'users' }) as Observable<User[]>;
    public users: WritableSignal<User[]> = signal<User[]>([]);

    constructor() {
        this.users$.subscribe(data => {
            this.users.set(data);
        })
    }

    // public getUsers(): User[] {
    //     return this.users();
    // }

    public getUserById(id: string): User | null {
        const users = this.users();
        console.log(users)
        return users.find(user => user.email === id) || null;
    }

    public userExists(id: string): boolean {
        console.log(id)
        return this.getUserById(id) !== null;
    }
}