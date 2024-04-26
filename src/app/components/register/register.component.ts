import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { error } from 'console';
import { ImageService } from '../../services/image-service/image.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      city: ['', Validators.required],
      username: ['', Validators.required],
      avatarUrl: [''],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private ms: MessageService,
    private router: Router,
    private imageService: ImageService
  ) {}

  get firstName() {
    return this.registerForm.controls['firstName'];
  }

  get lastName() {
    return this.registerForm.controls['lastName'];
  }

  get mail() {
    return this.registerForm.controls['mail'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  get city() {
    return this.registerForm.controls['city'];
  }

  get username() {
    return this.registerForm.controls['username'];
  }

  selectedFile: File | null = null;

  onFileChange(event: Event) {
    let input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submitDetails() {
    // shallow copy, modification on copy does not affect original object
    let postData = { ...this.registerForm.value }; // status is by default false
    delete postData.confirmPassword;

    if (this.selectedFile) {
      this.imageService.uploadAvatar(this.selectedFile).subscribe(
        (response) => {
          postData.avatarUrl = response.avatarUrl;
          this.registerUser(postData);
        },
        (error) => {}
      );
    } else {
      this.registerUser(postData);
    }
  }

  registerUser(user: any) {
    this.authService.registerUser(user).subscribe(
      (response) => {
        if (response) {
        }
        this.ms.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is registered!',
        });
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);
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
}
