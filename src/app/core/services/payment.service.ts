import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private api: ApiService) {}

  initiatePayment(orderId: number): Observable<Payment> {
    return this.api.post<Payment>(`payments/${orderId}`, {});
  }

  getPaymentStatus(id: number): Observable<Payment> {
    return this.api.get<Payment>(`payments/${id}`);
  }

  refundPayment(id: number): Observable<Payment> {
    return this.api.post<Payment>(`payments/${id}/refund`, {});
  }
}
