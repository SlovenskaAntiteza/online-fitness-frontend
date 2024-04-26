import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private ms: MessageService) {}

  public showSuccess(message: string) {
    this.ms.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  public showError(message: string) {
    this.ms.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  public showInfo(message: string) {
    this.ms.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }
}
