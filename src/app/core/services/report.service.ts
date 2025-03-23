import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SalesReport } from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private api: ApiService) {}

  getSalesReport(startDate: string, endDate: string): Observable<SalesReport> {
    return this.api.get<SalesReport>('reports/sales', { params: { start_date: startDate, end_date: endDate } });
  }
}
