export interface StoreModel {
  id: string;
  name: string;
  city: string;
  turnover: number;
  frequentation: number;
  price_reduction: number;
  created_at: Date;
  updated_at?: Date;
}
