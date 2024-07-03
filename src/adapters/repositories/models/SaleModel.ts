
export interface SaleModel {
  id: string;
  product_infos: SaleModelInfo[];
  total_price: number;
  sale_date: Date;
  updated_at?: Date;
}

export interface SaleModelInfo {
  product_id: string;
  quantity: number
}