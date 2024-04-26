import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParticpateResult } from '../../enums/ParticipateResult';
import { UserService } from '../../services/user-service/user.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrl: './participate.component.css',
})
export class ParticipateComponent {
  @Input() isViewable: boolean = false;
  @Input() program: any = '';
  @Output() modalClosed: EventEmitter<ParticpateResult> = new EventEmitter();

  participateForm = this.fb.group({
    paymentMethod: ['', Validators.required],
    paypalEmail: ['', Validators.email],
    visaCardNumber: ['', Validators.pattern('[0-9]{16}')], // assuming Visa card number is 16 digits
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  togglePaymentMethod(event: any) {
    const selectedValue = event.target.value;
    this.participateForm.patchValue({
      paymentMethod: selectedValue,
      paypalEmail:
        selectedValue === 'paypal'
          ? ''
          : this.participateForm.value.paypalEmail,
      visaCardNumber:
        selectedValue === 'visa'
          ? ''
          : this.participateForm.value.visaCardNumber,
    });

    if (selectedValue === 'paypal' || selectedValue === 'visa') {
      this.participateForm.controls['paypalEmail'].setValidators(
        selectedValue === 'paypal'
          ? [Validators.required, Validators.email]
          : null
      );
      this.participateForm.controls['visaCardNumber'].setValidators(
        selectedValue === 'visa'
          ? [Validators.required, Validators.pattern('[0-9]{16}')]
          : null
      );
    } else {
      this.participateForm.controls['paypalEmail'].setValidators(null);
      this.participateForm.controls['visaCardNumber'].setValidators(null);
    }

    this.participateForm.controls['paypalEmail'].updateValueAndValidity();
    this.participateForm.controls['visaCardNumber'].updateValueAndValidity();
  }

  hideModal(result: ParticpateResult) {
    this.participateForm.reset();
    this.modalClosed.emit(result);
  }

  hideModalCancle() {
    this.participateForm.reset();
    this.modalClosed.emit(ParticpateResult.CANCLE);
  }

  onSubmit() {
    let paymentMethod = this.participateForm.value.paymentMethod;
    if (paymentMethod === 'paypal') {
      // logic for paypal
    } else if (paymentMethod === 'visa') {
      // logic for visa card
    } else {
      // logic for location
    }

    let user = this.userService.getUser();
    if (user) {
      this.userService
        .participateUserInFitnessProgram(user.id, this.program.id)
        .subscribe(
          (response) => {
            this.hideModal(ParticpateResult.SUCCESS);
          },
          (error) => {
            this.hideModal(ParticpateResult.ERROR);
          }
        );
    } else {
      this.hideModal(ParticpateResult.ERROR);
    }
  }
}
