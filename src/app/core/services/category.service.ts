import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private api: ApiService) {}

  getCategories(): Observable<{ message: string; categories: Category[] }> {
    return this.api.get<{ message: string; categories: Category[] }>('categories');
  }

  getCategory(id: number): Observable<{ message: string; category: Category }> {
    return this.api.get<{ message: string; category: Category }>(`categories/${id}`);
  }

  createCategory(category: { name: string; description?: string }): Observable<{ message: string; category: Category }> {
    return this.api.post<{ message: string; category: Category }>('categories', category);
  }

  updateCategory(id: number, category: { name: string; description?: string }): Observable<{ message: string; category: Category }> {
    return this.api.put<{ message: string; category: Category }>(`categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`categories/${id}`);
  }
}
