import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramDetailsService } from './program-details.service';
import { error } from 'console';
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { AskAdvisorResult } from '../../enums/AskAdvisorResult';
import { NotificationService } from '../../services/notifi/notification.service';
import { ParticpateResult } from '../../enums/ParticipateResult';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.css',
})
export class ProgramDetailsComponent {
  newComment: string = '';
  isParticipating: any = false;
  showAskAdvisorModal: boolean = false;
  showParticipateModal: boolean = false;

  @Output() commentSubmitted = new EventEmitter<string>();

  public program: any = [];
  id: any;
  userId: any;

  safeUrl: any;

  constructor(
    private route: ActivatedRoute,
    private service: ProgramDetailsService,
    private userSrevice: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private _sanitizer: DomSanitizer
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadProgram();
  }

  loadProgram() {
    if (this.authService.isLoggedIn) {
      let user = this.userSrevice.getUser();
      if (user) {
        this.userId = user.id;
      }
    }
    this.service.getProgramById(this.id).subscribe(
      (data) => {
        this.program = data;
        let pomUrl = this.program.linkAddress.replace('watch?v=', 'embed/');
        this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(pomUrl);
        if (this.authService.isLoggedIn) {
          this.userSrevice.isParticipating(this.userId, this.id).subscribe(
            (response: any) => {
              this.isParticipating = response;
            },
            (error) => {}
          );
        }
      },
      (error) => {
        console.log('Could not find program1!');
      }
    );
  }

  submitComment() {
    if (this.newComment.trim()) {
      //this.commentSubmitted.emit(this.newComment);
      let comment = {
        comment: this.newComment,
        userId: this.userId,
        programId: this.program.id,
      };
      let pom;
      this.service.submitComment(comment).subscribe((data) => {
        pom = data;
        this.loadProgram();
      });
      this.newComment = ''; // clear the input after submission
    }
  }

  clearComment() {
    this.newComment = ''; // clear the input without submitting
  }

  askAdvisor() {
    this.showAskAdvisorModal = true;
  }

  onAskAdvisorCloseModal(result: AskAdvisorResult) {
    if (typeof result === 'number' && AskAdvisorResult[result]) {
      switch (result) {
        case AskAdvisorResult.SUBMIT:
          this.notificationService.showSuccess('Message successfully sent!');

          setTimeout(() => {
            this.showAskAdvisorModal = false;
          }, 2000);
          break;
        case AskAdvisorResult.ERROR:
          this.notificationService.showError('Could not sent message!');
          setTimeout(() => {
            this.showAskAdvisorModal = false;
          }, 2000);
          break;
        case AskAdvisorResult.CANCLE:
          setTimeout(() => {
            this.showAskAdvisorModal = false;
          }, 500);
          break;
      }
    } else {
      console.error('Invalid ChangePasswordResult:', result);
    }
  }

  participateInProgram() {
    this.showParticipateModal = true;
  }

  onParticipateCloseModal(result: ParticpateResult) {
    if (typeof result === 'number' && ParticpateResult[result]) {
      switch (result) {
        case ParticpateResult.SUCCESS:
          this.notificationService.showSuccess('Participation is successfull!');

          if (this.authService.isLoggedIn) {
            this.userSrevice.isParticipating(this.userId, this.id).subscribe(
              (response: any) => {
                this.isParticipating = response;
              },
              (error) => {}
            );
          }

          setTimeout(() => {
            this.showParticipateModal = false;
          }, 2000);
          break;
        case ParticpateResult.ERROR:
          this.notificationService.showError('Could not participate!');
          setTimeout(() => {
            this.showParticipateModal = false;
          }, 2000);
          break;
        case ParticpateResult.CANCLE:
          setTimeout(() => {
            this.showParticipateModal = false;
          }, 500);
          break;
      }
    } else {
      console.error('Invalid participation:', result);
    }
  }

  checkIsUserLogged(): boolean {
    return this.authService.isLoggedIn;
  }
}
