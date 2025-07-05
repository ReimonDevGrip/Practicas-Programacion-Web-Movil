import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Message } from '../../models/message.model';
import { collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, DocumentData, updateDoc } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userId = 'ramon@mail.com';
  private firestore = inject(Firestore);
  private messageRef: CollectionReference<DocumentData> = collection(this.firestore, `users/${this.userId}/messages`);

  private messages$ = collectionData(this.messageRef, { idField: 'id' }) as Observable<Message[]>;
  messages: WritableSignal<Message[]> = signal<Message[]>([]);

  constructor() {  
    this.messages$.subscribe( data => {
      this.messages.set(data);
    })
  }

  public getMessages(): Message[] {
    return this.messages();
  }

  public getMessageById(targetId: string): Message {
    return this.messages().find((item: Message) => item.id === targetId) as Message;
  }

  public async updateMessage(id: string, changes: Partial<Message>): Promise<void> {
    const docRef = doc(this.firestore, `users/${this.userId}/messages/${id}`);
    await updateDoc(docRef, changes);
  }

  public async sendMessage(message: Message) {
    message.date = new Date().toISOString();
    message.fromName = this.userId;
    const messagesRef = collection(
      this.firestore, `users/${message.email}/messages`
    )

    console.log(message)
    await addDoc(messagesRef, {
      fromName: message.fromName,
      subject: message.subject,
      date: message.date,
      message: message.message,
      read: false
    }).then(() => {
      alert('Mensaje Enviado')
    })
    .catch(err => {
      alert(`Error al enciar el mensaje: ${err}`)
    });
  }
}
