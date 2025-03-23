import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private api: ApiService) {}

  getCart(): Observable<CartItem[]> {
    return this.api.get<CartItem[]>('carts');
  }

  addToCart(item: { medicine_id: number; quantity: number }): Observable<CartItem> {
    return this.api.post<CartItem>('carts', item);
  }

  updateCartItem(id: number, quantity: number): Observable<CartItem> {
    return this.api.put<CartItem>(`carts/${id}`, { quantity });
  }

  removeFromCart(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`carts/${id}`);
  }
}
