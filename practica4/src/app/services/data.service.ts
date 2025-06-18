import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Message } from '../models/message.model';
import { collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { collection, DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore);
  private messageRef: CollectionReference<DocumentData> = collection(this.firestore, 'messages');

  private messages$ = collectionData(this.messageRef, { idField: 'id' }) as Observable<Message[]>;
  messages: WritableSignal<Message[]> = signal<Message[]>([]);

  // public messages: Message[] = [
  //   {
  //     fromName: 'Matt Chorsey',
  //     subject: 'New event: Trip to Vegas',
  //     date: '9:32 AM',
  //     id: 0,
  //     read: false
  //   },
  //   {
  //     fromName: 'Lauren Ruthford',
  //     subject: 'Long time no chat',
  //     date: '6:12 AM',
  //     id: 1,
  //     read: false
  //   },
  //   {
  //     fromName: 'Jordan Firth',
  //     subject: 'Report Results',
  //     date: '4:55 AM',
  //     id: 2,
  //     read: false
  //   },
  //   {
  //     fromName: 'Bill Thomas',
  //     subject: 'The situation',
  //     date: 'Yesterday',
  //     id: 3,
  //     read: false
  //   },
  //   {
  //     fromName: 'Joanne Pollan',
  //     subject: 'Updated invitation: Swim lessons',
  //     date: 'Yesterday',
  //     id: 4,
  //     read: false
  //   },
  //   {
  //     fromName: 'Andrea Cornerston',
  //     subject: 'Last minute ask',
  //     date: 'Yesterday',
  //     id: 5,
  //     read: false
  //   },
  //   {
  //     fromName: 'Moe Chamont',
  //     subject: 'Family Calendar - Version 1',
  //     date: 'Last Week',
  //     id: 6,
  //     read: false
  //   },
  //   {
  //     fromName: 'Kelly Richardson',
  //     subject: 'Placeholder Headhots',
  //     date: 'Last Week',
  //     id: 7,
  //     read: false
  //   }
  // ];

  constructor() {  
    this.messages$.subscribe( data => {
      this.messages.set(data);
    })
  }

  public getMessages(): Message[] {
    console.log(this.messages())
    return this.messages();
  }

  public getMessageById(targetId: string): Message {
    return this.messages().find((item: Message) => item.id === targetId) as Message;
  }
}
