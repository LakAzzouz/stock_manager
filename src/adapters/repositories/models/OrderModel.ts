import { OrderStatus } from "../../../core/types/OrderStatus";

export interface OrderModel {
  id: string;
  product_infos: ProductModelInfo[];
  total_price: number;
  location_id: string;
  order_date: Date;
  status: OrderStatus;
  expected_arrival_date: Date;
  date_of_arrival?: Date;
  updated_at?: Date;
}

export interface ProductModelInfo {
  product_id: string;
  quantity: number;
}
