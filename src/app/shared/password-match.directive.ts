import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let password = control.get('password');
  let confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value
    ? null
    : { passwordMatch: true };
};

export const passwordMatchValidatorChangePassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let password = control.get('newPassword');
  let confirmPassword = control.get('newPasswordRepeated');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value
    ? null
    : { passwordMatchChangePassword: true };
};
