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
    private selectedUser = signal('')

    private users$ = collectionData(this.useRef, { idField: 'users' }) as Observable<User[]>;
    public users: WritableSignal<User[]> = signal<User[]>([]);
    constructor() {

        this.users$.subscribe(data => {

            // console.log(data)
            this.users.set(data);
            // console.log(this.users())

        })
    }

    public getUsers(): User[] {
        console.log(this.users())

        return this.users();
    }

    public setSelectedUser() {
        
    }
}