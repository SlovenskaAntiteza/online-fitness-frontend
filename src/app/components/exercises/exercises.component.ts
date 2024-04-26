import { Component } from '@angular/core';
import { ExercisesService } from './exercises.service';
import { error } from 'console';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent {
  exerices: any = [];

  muscle = '';
  level = '';

  muscles: any = [
    { label: 'Abdominals', value: 'abdominals' },
    { label: 'Abductors', value: 'abductors' },
    { label: 'Adductors', value: 'adductors' },
    { label: 'Biceps', value: 'biceps' },
    { label: 'Calves', value: 'calves' },
    { label: 'Chest', value: 'chest' },
    { label: 'Forearms', value: 'forearms' },
    { label: 'Glutes', value: 'glutes' },
    { label: 'Hamstrings', value: 'hamstrings' },
    { label: 'Lats', value: 'lats' },
    { label: 'Lower Back', value: 'lower_back' },
    { label: 'Middle Back', value: 'middle_back' },
    { label: 'Neck', value: 'neck' },
    { label: 'Quadriceps', value: 'quadriceps' },
    { label: 'Traps', value: 'traps' },
    { label: 'Triceps', value: 'triceps' },
  ];

  levels = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Expert', value: 'expert' },
  ];

  constructor(private service: ExercisesService) {
    this.getExercises();
  }

  onChange() {
    console.log('change detected!');
    this.getExercises();
  }

  getExercises() {
    this.service.getAllExercises(this.muscle, this.level).subscribe({
      next: (data) => {
        this.exerices = data;
      },
      error: (error) => {
        console.error('It is not possible to access exercises!', error);
      },
    });
  }
}
