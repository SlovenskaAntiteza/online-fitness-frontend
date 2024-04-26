import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyProgramsService } from '../../services/my-programs-service/my-programs.service';
import { UserService } from '../../services/user-service/user.service';
import { response } from 'express';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../services/notifi/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrl: './my-programs.component.css',
})
export class MyProgramsComponent {
  createdPrograms: any[] = [];
  finishedPrograms: any[] = [];
  activePrograms: any[] = [];
  user: any;

  constructor(
    private router: Router,
    private myProgramsService: MyProgramsService,
    private userService: UserService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.user = this.userService.getUser();
    if (this.user && this.user.id) {
      this.myProgramsService.getCreatedPrograms(this.user.id).subscribe(
        (response: any) => {
          this.createdPrograms = response;
        },
        (error) => {
          this.notificationService.showError(
            'Could not load created programs!'
          );
        }
      );

      this.myProgramsService.getActivePrograms(this.user.id).subscribe(
        (response: any) => {
          this.activePrograms = response;
        },
        (error) => {
          this.notificationService.showError('Could not load active programs!');
        }
      );

      this.myProgramsService.getFinishedPrograms(this.user.id).subscribe(
        (response: any) => {
          this.finishedPrograms = response;
        },
        (error) => {
          this.notificationService.showError(
            'Could not load finished programs!'
          );
        }
      );
    }
  }

  onDeleteFitnessProgram() {
    this.myProgramsService.getCreatedPrograms(this.user.id).subscribe(
      (response: any) => {
        this.createdPrograms = response;
      },
      (error) => {
        this.notificationService.showError('Could not load created programs!');
      }
    );
  }
}
