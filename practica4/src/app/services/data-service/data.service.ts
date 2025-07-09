import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Message } from '../../models/message.model';
import { collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, DocumentData, updateDoc } from 'firebase/firestore';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/users.model';
import { LoginService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loginService = inject(LoginService);
  private firestore = inject(Firestore);
  private currentUser: User | null = null;
  private messageRef: CollectionReference<DocumentData> | null = null;
  private messagesSubscription: Subscription | null = null;
  private userSubscription: Subscription | null = null;
  messages: WritableSignal<Message[]> = signal<Message[]>([]);
  userId = '';

  constructor() {
    effect(() => {
      const user = this.loginService.getCurrentUser();
      this.handleUserChange(user);
    });
  }

  private handleUserChange(user: User | null): void {
    this.currentUser = user;

    if (user) {
      this.userId = user.email;
      this.setUserId(user.email);
    } else {
      this.userId = '';
    }
  }

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

  public async deleteMessage(id: string): Promise<void> {
    const docRef = doc(this.firestore, `users/${this.userId}/messages/${id}`);
    await deleteDoc(docRef);
  }

  public async sendMessage(user: User, message: Message) {
    message.date = new Date().toISOString();
    message.fromName = this.userId;
    const messagesRef = collection(
      this.firestore, `users/${user.email}/messages`
    )

    console.log(this.currentUser)
    await addDoc(messagesRef, {
      fromName: this.currentUser!.email,
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

  public destroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}