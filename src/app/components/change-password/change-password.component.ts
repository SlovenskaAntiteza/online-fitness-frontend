import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidatorChangePassword } from '../../shared/password-match.directive';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { ChangePasswordResult } from '../../enums/ChangePasswordResult';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  @Input() isViewable: boolean = false;
  @Output() modalClosed: EventEmitter<ChangePasswordResult> =
    new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ms: MessageService
  ) {}

  passwordChangeForm = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordRepeated: ['', Validators.required],
    },
    {
      validators: passwordMatchValidatorChangePassword,
    }
  );

  get currentPassword() {
    return this.passwordChangeForm.controls['currentPassword'];
  }
  get newPassword() {
    return this.passwordChangeForm.controls['newPassword'];
  }
  get newPasswordRepeated() {
    return this.passwordChangeForm.controls['newPasswordRepeated'];
  }

  hideModalCancle() {
    this.passwordChangeForm.reset();
    this.modalClosed.emit(ChangePasswordResult.CANCLE);
  }

  hideModal(value: ChangePasswordResult) {
    this.passwordChangeForm.reset();
    this.modalClosed.emit(value);
  }

  changePassword() {
    let user = this.userService.getUser();
    if (!user) {
      this.router.navigate(['/login']);
    } else {
      let dataForm = { ...this.passwordChangeForm.value };

      this.userService
        .changePassword({
          id: user.id,
          currentPassword: dataForm.currentPassword,
          newPassword: dataForm.newPassword,
        })
        .subscribe(
          () => {
            this.hideModal(ChangePasswordResult.SUCCESS);
          },
          (error) => {
            this.hideModal(ChangePasswordResult.ERROR);
          }
        );
    }
  }
}
