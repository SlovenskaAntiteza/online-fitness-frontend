import { Component } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';
import { response } from 'express';
import { error } from 'console';
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notifi/notification.service';
import { SendMessageResult } from '../../enums/SendMessageResult';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  users: any = [];

  messages: any = [];
  numOfRecords: number = 0;
  pageSize: number = 10;
  offset: number = 0;

  userId: any;

  showSendMessageModal: boolean = false;

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.initPage();
  }

  initPage() {
    // TODO load all users
    let user = this.userService.getUser();
    if (user) {
      this.userId = user.id;
    }
    this.loadAllUsers();
    this.loadMessages();
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        if (response) {
          this.users = response;
        }
      },
      (error) => {}
    );
  }

  loadMessages() {
    let user = this.userService.getUser();
    if (this.authService.isLoggedIn && user) {
      this.chatService
        .getMessages(this.offset, this.pageSize, user.id)
        .subscribe(
          (response: any) => {
            if (response) {
              this.messages = response;
              this.numOfRecords = response.totalElements;
            }
          },
          (error) => {
            console.error('Error when loading messages');
          }
        );
    }
  }

  onPageChange(event: any) {
    this.offset = event.page;
    this.pageSize = event.rows;
    this.loadMessages();
  }

  calculateDays = (date: any): number => {
    let pomDate = new Date(date);
    let currentDate = new Date();
    let diffirantiateInMilisec = currentDate.getTime() - pomDate.getTime();

    return Math.floor(diffirantiateInMilisec / (1000 * 60 * 60 * 24));
  };

  sendMessage() {
    this.showSendMessageModal = true;
  }

  onSendMessageModalClosed(result: SendMessageResult) {
    if (typeof result === 'number' && SendMessageResult[result]) {
      switch (result) {
        case SendMessageResult.SUBMIT:
          this.notificationService.showSuccess('Message sent successfully!');
          setTimeout(() => {
            this.showSendMessageModal = false;
            this.loadMessages();
          }, 2000);
          break;
        case SendMessageResult.ERROR:
          this.notificationService.showError('Somethign went wrong!');
          setTimeout(() => {
            this.showSendMessageModal = false;
          }, 2000);
          break;
        case SendMessageResult.CANCLE:
          setTimeout(() => {
            this.showSendMessageModal = false;
          }, 500);
          break;
      }
    } else {
      console.error('Invalid ChangePasswordResult:', result);
    }
  }
}
