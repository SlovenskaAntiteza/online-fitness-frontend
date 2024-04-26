import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { ChangePasswordResult } from '../../enums/ChangePasswordResult';
import { ImageService } from '../../services/image-service/image.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any = {};
  updateForm = this.fb.group({
    firstName: [this.user.firstName || '', Validators.required],
    lastName: [this.user.lastName || '', Validators.required],
    city: [this.user.city || '', Validators.required],
    mail: [this.user.mail || '', Validators.required],
    avatarUrl: [],
  });
  isFormDirty: boolean = false;
  showChangePasswordModule = false;

  constructor(
    private userService: UserService,
    private ms: MessageService,
    private fb: FormBuilder,
    private imageService: ImageService
  ) {
    this.initForm();
  }

  initForm() {
    this.user = this.userService.getUser();
    if (this.user) {
      this.updateForm = this.fb.group({
        firstName: [this.user.firstName || '', Validators.required],
        lastName: [this.user.lastName || '', Validators.required],
        city: [this.user.city || '', Validators.required],
        mail: [this.user.mail || '', Validators.required],
        avatarUrl: [],
      });

      this.updateForm.valueChanges.subscribe(() => {
        this.isFormDirty = true;
      });
    } else {
      this.user = {
        firstName: '',
        lastName: '',
        avatarUrl: '',
        city: '',
        id: '',
        mail: '',
        status: true,
        token: '',
        username: '',
      };
    }
  }

  get firstName() {
    return this.updateForm.controls['firstName'];
  }
  get lastName() {
    return this.updateForm.controls['lastName'];
  }
  get city() {
    return this.updateForm.controls['city'];
  }
  get avatarUrl() {
    return this.updateForm.controls['avatarUrl'];
  }

  selectedFile: File | null = null;

  onFileChange(event: Event) {
    let input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.isFormDirty = true;
    }
  }

  submitData() {
    if (this.selectedFile) {
      this.imageService.uploadAvatar(this.selectedFile).subscribe(
        (response) => {
          this.updateUser(response.avatarUrl);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.updateUser('');
    }
  }

  updateUser(avatarUrl: string) {
    let id = this.userService.getUser().id;
    let userUpdated = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      city: this.city.value,
      avatarUrl: avatarUrl,
    };

    this.userService.updateUser(userUpdated, id).subscribe(
      (data: any) => {
        if (data) {
          let sessionUser = this.userService.getUser();
          sessionUser.firstName = data.firstName;
          sessionUser.lastName = data.lastName;
          sessionUser.city = data.city;
          sessionUser.avatarUrl = data.avatarUrl;

          this.userService.setSessionUser(sessionUser);
          this.user = this.userService.getUser();
        }
        this.isFormDirty = false;
      },
      (error) => {
        this.ms.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong!',
        });
      }
    );
  }

  changePassword() {
    this.showChangePasswordModule = true;
  }

  onCloseModal(result: ChangePasswordResult) {
    if (typeof result === 'number' && ChangePasswordResult[result]) {
      switch (result) {
        case ChangePasswordResult.SUCCESS:
          this.ms.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password successfully changed!',
          });
          setTimeout(() => {
            this.showChangePasswordModule = false;
          }, 2000);
          break;
        case ChangePasswordResult.ERROR:
          this.ms.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!',
          });
          setTimeout(() => {
            this.showChangePasswordModule = false;
          }, 2000);
          break;
        case ChangePasswordResult.CANCLE:
          setTimeout(() => {
            this.showChangePasswordModule = false;
          }, 500);
          break;
      }
    } else {
      console.error('Invalid ChangePasswordResult:', result);
    }
  }

  shouldEnableButton(): boolean {
    return this.isFormDirty && this.updateForm.valid;
  }
}
