import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyProgramsService } from '../../services/my-programs-service/my-programs.service';
import { UserService } from '../../services/user-service/user.service';
import { NotificationService } from '../../services/notifi/notification.service';

@Component({
  selector: 'app-fitness-program-card',
  templateUrl: './fitness-program-card.component.html',
  styleUrl: './fitness-program-card.component.css',
})
export class FitnessProgramCardComponent {
  @Input() isCreated: boolean = false;
  @Input() program: any;
  @Input() differentiateTabs: string = '';
  @Output() notifyDeleted = new EventEmitter<any>();
  constructor(
    private myProgramsService: MyProgramsService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  deleteProgram() {
    let user = this.userService.getUser();
    if (user) {
      this.myProgramsService
        .deleteFitnessProgram(user.id, this.program.id)
        .subscribe(
          (response) => {
            this.notificationService.showSuccess(
              'Program successfully deleted!'
            );
            setTimeout(() => this.notifyDeleted.emit(), 1500);
          },
          (error) => {
            this.notificationService.showError('Something went wrong');
          }
        );
    } else {
      this.notificationService.showError('Something went wrong');
    }
  }
}
