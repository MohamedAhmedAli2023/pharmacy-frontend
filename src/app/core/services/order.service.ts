import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Order, OrderTracking } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private api: ApiService) {}

  getOrders(): Observable<Order[]> {
    return this.api.get<Order[]>('orders');
  }

  getOrder(id: number): Observable<Order> {
    return this.api.get<Order>(`orders/${id}`);
  }

  createOrderFromCart(): Observable<Order> {
    return this.api.post<Order>('orders/from-cart', {});
  }

  confirmOrder(id: number): Observable<Order> {
    return this.api.post<Order>(`orders/${id}/confirm`, {});
  }

  trackOrder(id: number): Observable<{ message: string; order: Order; tracking: OrderTracking[] }> {
    return this.api.get<{ message: string; order: Order; tracking: OrderTracking[] }>(`orders/${id}/track`);
  }
}
