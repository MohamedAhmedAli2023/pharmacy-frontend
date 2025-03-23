import { Medicine } from './medicine.model';

export interface SalesReport {
  total_sales: number;
  order_count: number;
  top_medicines: (Medicine & { orders_count: number })[];
  sales_by_category: { category_name: string; total_sales: number }[];
}
