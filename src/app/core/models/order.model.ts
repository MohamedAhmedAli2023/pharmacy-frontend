export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderTracking {
  status: string;
  updated_at: string;
}
