import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AskAdvisorResult } from '../../enums/AskAdvisorResult';
import { UserService } from '../../services/user-service/user.service';
import { response } from 'express';
import { error } from 'console';
import { NotificationService } from '../../services/notifi/notification.service';

@Component({
  selector: 'app-ask-advisor',
  templateUrl: './ask-advisor.component.html',
  styleUrl: './ask-advisor.component.css',
})
export class AskAdvisorComponent {
  @Input() isViewable: boolean = false;
  @Input() programId: any = null;
  @Output() modalClosed: EventEmitter<AskAdvisorResult> = new EventEmitter();

  askAdvisorForm = this.fb.group({
    message: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  get message() {
    return this.askAdvisorForm.controls['message'];
  }

  hideModal(result: AskAdvisorResult) {
    this.askAdvisorForm.reset();
    this.modalClosed.emit(result);
  }

  hideModalCancle() {
    this.askAdvisorForm.reset();
    this.modalClosed.emit(AskAdvisorResult.CANCLE);
  }

  onSubmit() {
    let user = this.userService.getUser();
    if (user) {
      let userId = user.id;
      let dataForm = {
        ...this.askAdvisorForm.value,
        userId: userId,
        programId: this.programId,
      };

      this.userService.sendMessageToAdvisor(dataForm).subscribe(
        (response) => {
          this.hideModal(AskAdvisorResult.SUBMIT);
        },
        (error) => {
          this.hideModal(AskAdvisorResult.ERROR);
        }
      );
    }
  }
}
