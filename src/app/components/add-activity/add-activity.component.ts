import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnalyticService } from '../../services/analytic-service/analytic.service';
import { response } from 'express';
import { error } from 'console';
import { AddActivityResult } from '../../enums/AddActivityResult';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.scss',
})
export class AddActivityComponent implements OnInit {
  @Input() isViewable = false;
  @Input() userId: any;
  @Output() modalClosed: EventEmitter<AddActivityResult> = new EventEmitter();

  intensities!: any[];

  activityForm = this.fb.group({
    name: ['', Validators.required],
    intensity: [null as any, Validators.required],
    sets: ['', Validators.required],
    reps: ['', Validators.required],
    weight: [''],
  });

  constructor(
    private fb: FormBuilder,
    private analyticService: AnalyticService
  ) {}

  ngOnInit(): void {
    this.intensities = [
      { label: 'Hard', value: 'hard' },
      { label: 'Medium', value: 'medium' },
      { label: 'Easy', value: 'easy' },
    ];
  }

  get name() {
    return this.activityForm.controls['name'];
  }

  get intensity() {
    return this.activityForm.controls['intensity'];
  }

  get sets() {
    return this.activityForm.controls['sets'];
  }

  get reps() {
    return this.activityForm.controls['reps'];
  }

  get weight() {
    return this.activityForm.controls['reps'];
  }

  hideModal(result: AddActivityResult) {
    this.activityForm.reset();
    this.modalClosed.emit(result);
  }

  hideModalCancle() {
    this.activityForm.reset();
    this.modalClosed.emit(AddActivityResult.CANCLE);
  }

  onSubmit() {
    let pom = { ...this.activityForm.value };
    let activity = {
      userId: this.userId,
      name: pom.name,
      sets: pom.sets,
      reps: pom.reps,
      weight: pom.weight,
      intensity: pom.intensity.value,
    };

    this.analyticService.addActivity(activity).subscribe(
      (response) => {
        this.hideModal(AddActivityResult.SUCCESS);
      },
      (error) => {
        this.hideModal(AddActivityResult.ERROR);
      }
    );
  }
}
