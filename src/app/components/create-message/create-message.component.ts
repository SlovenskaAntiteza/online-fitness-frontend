import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat-service/chat.service';
import { SendMessageResult } from '../../enums/SendMessageResult';
import { UserService } from '../../services/user-service/user.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrl: './create-message.component.css',
})
export class CreateMessageComponent implements OnInit {
  @Input() isViewable = false;
  @Input() userId: any;
  @Output() modalClosed: EventEmitter<SendMessageResult> = new EventEmitter();

  messageForm = this.fb.group({
    message: ['', Validators.required],
    user: ['', Validators.required],
  });

  users: any = [];
  selectedUser: any;
  filteredUsers: any = [];

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (response) => {
        if (response) {
          this.users = response;
        }
      },
      (error) => {}
    );
  }

  filterUsers(event: any) {
    let query = event.query;
    this.filteredUsers = this.users.filter((user: any) => {
      return (
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  onUserSelect(event: any) {
    this.selectedUser = event.value;
    let fullName =
      this.selectedUser.firstName + ' ' + this.selectedUser.lastName;
    this.messageForm.controls['user'].setValue(fullName);
  }

  get message() {
    return this.messageForm.controls['message'];
  }

  hideModal(result: SendMessageResult) {
    this.messageForm.reset();
    this.modalClosed.emit(result);
  }

  hideModalCancel() {
    this.messageForm.reset();
    this.modalClosed.emit(SendMessageResult.CANCLE);
  }

  onSumbit() {
    let sendMessage = {
      message: this.messageForm.controls['message'].value,
      receiver: this.selectedUser.id,
      sender: this.userId,
    };

    this.chatService.sendMessage(sendMessage).subscribe(
      (response) => {
        this.hideModal(SendMessageResult.SUBMIT);
      },
      (error) => {
        this.hideModal(SendMessageResult.ERROR);
      }
    );
  }
}
