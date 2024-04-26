import { Component, OnInit } from '@angular/core';
import { FitnessProgramsService } from './fitness-programs.service';
import { error } from 'console';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-fitness-programs',
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.css',
})
export class FitnessProgramsComponent implements OnInit {
  programs: any = [];
  numOfRecords: number = 0;
  pageSize: number = 10;
  offset: number = 0;

  categories: any = [];
  selectedCategory: any = '';

  levels: any = ['Expert', 'Intermediate', 'Beginner'];
  selectedLevel: any = '';

  locations: any = ['Gym', 'Online', 'Park'];
  selectedLocation: any = '';

  constructor(
    private fitnessProgramService: FitnessProgramsService,
    private http: HttpClient
  ) {}

  onPageChange(event: any) {
    this.offset = event.page;
    this.pageSize = event.rows;
    this.filterPrograms();
  }

  ngOnInit(): void {
    this.loadElements();
    this.loadCategories();
  }

  loadElements() {
    this.fitnessProgramService
      .findAllPrograms(this.offset, this.pageSize)
      .subscribe(
        (data) => {
          if (data) {
            this.programs = data;
            this.numOfRecords = data.totalElements;
          }
        },
        (error) => {
          console.log('Error when loading fitness programs!');
        }
      );
  }

  loadCategories() {
    this.fitnessProgramService.findAllCategories().subscribe(
      (data) => {
        this.categories = data.map((category: any) => category.name);
      },
      (error) => {
        console.log('Error when loading categories!');
      }
    );
  }

  filterPrograms() {
    let filter = {
      fitnessProgramCategory: this.selectedCategory,
      location: this.selectedLocation,
      difficultyLevel: this.selectedLevel,
    };

    this.fitnessProgramService
      .findAllCategoriesByFilters(this.offset, this.pageSize, filter)
      .subscribe(
        (data) => {
          this.programs = data;
          this.numOfRecords = data.totalElements;
        },
        (error) => {
          console.log('Could not load programs!');
        }
      );
  }
}
