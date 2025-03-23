import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Medicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  constructor(private api: ApiService) {}

getMedicines(): Observable<{ message: string; medicines: Medicine[] }> {
    return this.api.get<{ message: string; medicines: Medicine[] }>('medicines');
  }

  getMedicine(id: number): Observable<Medicine> {
    return this.api.get<Medicine>(`medicines/${id}`);
  }

  createMedicine(medicine: { name: string; description?: string; stock: number; category_id: number; price: number }): Observable<Medicine> {
    return this.api.post<Medicine>('medicines', medicine);
  }

  updateMedicine(id: number, medicine: { name: string; description?: string; stock: number; category_id: number; price: number }): Observable<Medicine> {
    return this.api.put<Medicine>(`medicines/${id}`, medicine);
  }

  deleteMedicine(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`medicines/${id}`);
  }
}
