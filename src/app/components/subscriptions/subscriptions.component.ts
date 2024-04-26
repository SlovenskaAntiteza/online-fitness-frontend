import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { CategoryService } from '../../services/category-service/category.service';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent implements OnInit {
  categories: any = [];
  userId: any;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      let user = this.userService.getUser();
      if (user) {
        this.userId = user.id;
        this.loadCategories();
      }
    } else {
      console.error('User is not logged in!');
    }
  }

  loadCategories() {
    this.categoryService.getCategoriesForClient(this.userId).subscribe(
      (response) => {
        if (response) {
          this.categories = response;
        }
      },
      (error) => {}
    );
  }

  subscribe(category: any) {
    let categoryId = category.id;

    if (categoryId) {
      this.categoryService.subscribe(this.userId, categoryId).subscribe(
        (response) => {
          category.subscribed = true;
        },
        (error) => {}
      );
    }
  }

  unsubscribe(category: any) {
    let categoryId = category.id;
    if (categoryId) {
      this.categoryService.unsubscribe(this.userId, categoryId).subscribe(
        (response) => {
          category.subscribed = false;
        },
        (error) => {}
      );
    }
  }
}
