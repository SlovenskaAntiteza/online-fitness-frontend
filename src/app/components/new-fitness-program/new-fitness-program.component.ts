import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../services/category-service/category.service';
import { response } from 'express';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { ImageService } from '../../services/image-service/image.service';
import { FitnessProgramService } from '../../services/fitness-program-service/fitness-program.service';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-fitness-program',
  templateUrl: './new-fitness-program.component.html',
  styleUrl: './new-fitness-program.component.css',
})
export class NewFitnessProgramComponent {
  youtubeRegex: string =
    '(?:https?:\\/\\/)?(?:www\\.)?youtu(?:\\.be\\/|be.com\\/\\S*(?:watch|embed)(?:(?:(?=\\/[-a-zA-Z0-9_]{11,}(?!\\S))\\/)|(?:\\S*v=|v\\/)))([-a-zA-Z0-9_]{11,})';

  name = new FormControl('', [Validators.required]);
  duration = new FormControl('', [Validators.required]);
  difficulty = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  description = new FormControl('');

  location = new FormControl('', [Validators.required]);
  instructorName = new FormControl('', [Validators.required]);
  instructorContact = new FormControl('', [Validators.required]);

  category = new FormControl(null as any, [Validators.required]);

  isLinear = false;

  address = new FormControl('');
  youtubeLink = new FormControl('');

  fitProgramForm = this._formBuilder.group({
    name: this.name,
    duration: this.duration,
    difficulty: this.difficulty,
    price: this.price,
    description: this.description,
    location: this.location,
    instructorName: this.instructorName,
    instructorContact: this.instructorContact,
    category: this.category,
    address: this.address,
    youtubeLink: this.youtubeLink,
    attributes: this._formBuilder.array([]),
  });

  locations: any[] = [
    { label: 'GYM', value: 'GYM' },
    { label: 'ONLINE', value: 'ONLINE' },
    { label: 'PARK', value: 'PARK' },
  ];

  categoriesOptions: [] = [];
  categories: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private ms: MessageService,
    private imageService: ImageService,
    private fitnessProgramService: FitnessProgramService,
    private userService: UserService,
    private router: Router
  ) {
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.categoriesOptions = response.map((category: any) => category.name);
        this.categories = response;
      },
      (error) => {
        this.ms.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load categories!',
        });
      }
    );
  }

  onLocationChange(event: any) {
    let selectedValue = event.value;
    if (selectedValue === 'ONLINE') {
      this.address.clearValidators();
      this.address.setValue('');
      this.youtubeLink.addValidators([
        Validators.required,
        Validators.pattern(this.youtubeRegex),
      ]);
    } else {
      this.youtubeLink.clearValidators();
      this.youtubeLink.setValue('');
      this.address.addValidators(Validators.required);
    }
  }

  collectionAttributes: any = [];

  onCategoryChange(event: any) {
    let selectedCategory = this.categories.find(
      (category) => event.value === category.name
    );

    if (selectedCategory) {
      this.attributes.clear();

      let group: any = {};

      selectedCategory.attributes.forEach((attribute: any) => {
        group[attribute.name] = ['', Validators.required];
      });

      let tmpGroup = this._formBuilder.group(group);
      this.attributes.push(tmpGroup);
      this.collectionAttributes = selectedCategory.attributes;
    }
  }

  getCategoryAttribute(index: number) {
    let selectedCategory = this.categories.find(
      (category) => category.name === this.fitProgramForm.value.category
    );
    if (selectedCategory && selectedCategory.attributes.length > index) {
      return selectedCategory.attributes[index];
    }
    return null;
  }

  get attributes() {
    return this.fitProgramForm.controls['attributes'] as FormArray;
  }

  selectedFiles: File[] = [];

  onFileSelected(event: any) {
    this.selectedFiles = [];
    let files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  disableUpload = true;

  submitData() {
    let categoryId = this.categories.find(
      (e) => e.name === this.category.value
    );
    let fitnessProgramData: any = {
      ...this.fitProgramForm.value,
      userId: this.userService.getUser().id,
      categoryId: categoryId.id,
    };

    fitnessProgramData['linkAddress'] = '';

    let attributes: any = fitnessProgramData.attributes
      ? fitnessProgramData.attributes[0]
      : null;
    let mapped = this.collectionAttributes.map((elem: any) => {
      return { id: elem.id, value: attributes[elem.name], name: elem.name };
    });
    fitnessProgramData['attributes'] = mapped;
    // First I need to save fitness program, then images for the program

    this.fitnessProgramService.addFitnessProgram(fitnessProgramData).subscribe(
      (response) => {
        if (response && this.selectedFiles.length > 0) {
          let programId = response;
          this.imageService
            .uploadProgramImages(programId, this.selectedFiles)
            .subscribe(
              (response) => {},
              (error) => {
                this.ms.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'Something went wrong with uploading fitness program images!',
                });
                setTimeout(() => {
                  this.router.navigate(['/my-programs']);
                }, 2000);
              }
            );
        }
        this.ms.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Fitness program is created!',
        });
        setTimeout(() => {
          this.router.navigate(['/my-programs']);
        }, 2000);
      },
      (error) => {
        this.ms.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong with creating fitness program!',
        });
      }
    );
  }
}
