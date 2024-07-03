import { StockData } from "../../../core/types/StockData";

export interface StockModel {
  id: string;
  product_id: string;
  stock_by_location: StockData[];
  created_at: Date;
  updated_at?: Date;
}
