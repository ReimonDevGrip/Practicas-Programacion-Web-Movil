// import { inject, Injectable, signal, WritableSignal } from '@angular/core';
// import { Message } from '../../models/message.model';
// import { collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
// import { addDoc, collection, deleteDoc, doc, DocumentData, updateDoc } from 'firebase/firestore';
// import { Observable } from 'rxjs';
// import { User } from 'src/app/models/users.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {
//   private userId = '';
//   private firestore = inject(Firestore);
//   private messageRef: CollectionReference<DocumentData> = collection(this.firestore, `users/${this.userId}/messages`);

//   private messages$ = collectionData(this.messageRef, { idField: 'id' }) as Observable<Message[]>;
//   messages: WritableSignal<Message[]> = signal<Message[]>([]);

//   constructor() {  
//     this.messages$.subscribe( data => {
//       this.messages.set(data);
//     })
//   }

//   public getMessages(): Message[] {
//     return this.messages();
//   }

//   public getMessageById(targetId: string): Message {
//     return this.messages().find((item: Message) => item.id === targetId) as Message;
//   }

//   public async updateMessage(id: string, changes: Partial<Message>): Promise<void> {
//     const docRef = doc(this.firestore, `users/${this.userId}/messages/${id}`);
//     await updateDoc(docRef, changes);
//   }

//   public async deleteMessage(id: string): Promise<void> {
//     const docRef = doc(this.firestore, `users/${this.userId}/messages/${id}`);
//     await deleteDoc(docRef);
//   }

//   public async sendMessage(user: User, message: Message) {
//     message.date = new Date().toISOString();
//     message.fromName = this.userId;
//     const messagesRef = collection(
//       this.firestore, `users/${user.email}/messages`
//     )

//     console.log(message)
//     await addDoc(messagesRef, {
//       fromName: message.fromName,
//       subject: message.subject,
//       date: message.date,
//       message: message.message,
//       read: false
//     }).then(() => {
//       alert('Mensaje Enviado')
//     })
//     .catch(err => {
//       alert(`Error al enciar el mensaje: ${err}`)
//     });
//   }
// }
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Message } from '../../models/message.model';
import { collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, DocumentData, updateDoc } from 'firebase/firestore';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userId = '';
  private firestore = inject(Firestore);
  private messageRef: CollectionReference<DocumentData> | null = null;
  private messagesSubscription: Subscription | null = null;

  messages: WritableSignal<Message[]> = signal<Message[]>([]);

  constructor() { }

  public setUserId(userId: string): void {
    if (this.userId === userId) return;

    this.userId = userId;

    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }

    this.messageRef = collection(this.firestore, `users/${this.userId}/messages`);

    const messages$ = collectionData(this.messageRef, { idField: 'id' }) as Observable<Message[]>;
    this.messagesSubscription = messages$.subscribe(data => {
      this.messages.set(data);
    });
  }

  public getUserId(): string {
    return this.userId;
  }

  public getMessages(): Message[] {
    return this.messages();
  }

  public getMessageById(targetId: string): Message {
    return this.messages().find((item: Message) => item.id === targetId) as Message;
  }

  public async updateMessage(id: string, changes: Partial<Message>): Promise<void> {
    if (!this.userId) {
      throw new Error('UserId no establecido');
    }
    const docRef = doc(this.firestore, `users/${this.userId}/messages/${id}`);
    await updateDoc(docRef, changes);
  }

  public async deleteMessage(id: string): Promise<void> {
    if (!this.userId) {
      throw new Error('UserId no establecido');
    }
    const docRef = doc(this.firestore, `users/${this.userId}/messages/${id}`);
    await deleteDoc(docRef);
  }

  public async sendMessage(user: User, message: Message) {
    if (!this.userId) {
      throw new Error('UserId no establecido');
    }

    message.date = new Date().toISOString();
    message.fromName = this.userId;
    const messagesRef = collection(
      this.firestore, `users/${user.email}/messages`
    )

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

  // Método para limpiar recursos al destruir el servicio
  public ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}