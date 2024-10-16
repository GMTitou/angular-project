import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  userName!: string;

  private categoriesUrl = 'http://localhost:3000/categories';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(this.categoriesUrl);
  }

  setUser(userName: string) {
    this.userName = userName;
  }

  getUser() {
    return this.userName
  }
}
