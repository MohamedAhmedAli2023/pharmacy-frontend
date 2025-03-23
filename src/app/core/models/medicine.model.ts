export interface Medicine {
  id: number;
  name: string;
  description?: string;
  stock: number;
  category_id: number;
  price: number;
}
