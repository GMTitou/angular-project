import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoriesService} from "../shared/services/categories.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  user: string = this.categoriesService.getUser();

  constructor(private categoriesService: CategoriesService, private router: Router) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  navigateCategory(category: any): void {
    if (!this.user || !category.categoryName) {
      console.error('User or categoryName is undefined');
      return;
    }
    this.router.navigate(['/quiz', this.user, category.categoryName]);
  }
}
