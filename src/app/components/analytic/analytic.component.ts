import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { Table } from 'primeng/table';
import { AuthService } from '../../services/auth.service';
import { AnalyticService } from '../../services/analytic-service/analytic.service';
import { Activity } from '../../domain/activity';
import { DatePipe } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '../../services/notifi/notification.service';
import { AddActivityResult } from '../../enums/AddActivityResult';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrl: './analytic.component.scss',
  providers: [DatePipe],
})
export class AnalyticComponent implements OnInit {
  activities!: Activity[];
  intensities!: any[];

  showAddActivityDialog: boolean = false;

  loading: boolean = true;
  userId: any;

  bodyWeights: any = null;
  data: any;
  options: any;

  startDate: Date | undefined;
  endDate: Date | undefined;
  weightValue: number | any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private analyticService: AnalyticService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      let user = this.userService.getUser();
      if (user) {
        this.userId = user.id;
        this.loadBodyWeights();
        this.loadActvites();
        this.loadIntensities();
      }
    }
  }

  loadIntensities() {
    this.intensities = [
      { label: 'Hard', value: 'hard' },
      { label: 'Medium', value: 'medium' },
      { label: 'Easy', value: 'easy' },
    ];
  }

  loadActvites() {
    this.analyticService.findAllActivitesForUserId(this.userId).subscribe(
      (response: Activity[]) => {
        this.activities = response;
      },
      (error) => {}
    );
  }

  loadBodyWeights() {
    let pom: any = { userId: this.userId };
    if (this.startDate) {
      pom.startDate = this.startDate;
    } else {
      pom.startDate = null;
    }
    if (this.endDate) {
      pom.endDate = this.endDate;
    } else {
      pom.endDate = null;
    }
    this.analyticService.findAllBodyWeightsForUser(pom).subscribe(
      (response: any) => {
        this.bodyWeights = response;

        this.loadChartData();
      },
      (error) => {}
    );
  }

  loadChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.bodyWeights.dates,
      datasets: [
        {
          label: 'Body weights',
          data: this.bodyWeights.weights,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  clear(table: Table) {
    // for deleting all filters in table
    table.clear();
  }

  getSeverity(intensity: string): any {
    switch (intensity.toLowerCase()) {
      case 'hard':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'easy':
        return 'info';
      default:
        return null;
    }
  }

  addNewBodyWeight() {
    if (this.weightValue) {
      let pom = { userId: this.userId, weight: this.weightValue };
      this.analyticService.addBodyWeight(pom).subscribe(
        (response: any) => {
          this.loadBodyWeights();
          this.notificationService.showSuccess(
            'Body weight scuccessfully added!'
          );
        },
        (error) => {
          this.notificationService.showError('Something went wrong!');
        }
      );
    }
  }

  addNewActivity() {
    this.showAddActivityDialog = true;
  }

  deleteActivity(activityId: any) {
    this.analyticService.deleteActivity(activityId).subscribe(
      (response) => {
        this.activities = this.activities.filter(
          (elem) => elem.id !== activityId
        );
      },
      (error) => {}
    );
  }

  onModalClosed(result: AddActivityResult) {
    if (typeof result === 'number' && AddActivityResult[result]) {
      switch (result) {
        case AddActivityResult.SUCCESS:
          this.notificationService.showSuccess('Activity successfully added!');
          setTimeout(() => {
            this.showAddActivityDialog = false;
            this.loadActvites();
          }, 2000);
          break;
        case AddActivityResult.ERROR:
          this.notificationService.showError('Something went wrong!');
          setTimeout(() => {
            this.showAddActivityDialog = false;
          }, 2000);
          break;
        case AddActivityResult.CANCLE:
          setTimeout(() => {
            this.showAddActivityDialog = false;
          }, 500);
          break;
      }
    } else {
      console.error('Invalid add activity:', result);
    }
  }

  downloadPdf() {
    this.analyticService.downloadPdf(this.userId).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'Analytic_' + this.userId + '.pdf'; // Ime fajla koje će preuzeti korisnik
        downloadLink.click();
      },
      (error) => {
        console.error('Greška prilikom preuzimanja PDF-a:', error);
      }
    );
  }
}
