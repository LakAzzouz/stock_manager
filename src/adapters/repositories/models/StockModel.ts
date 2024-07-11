import { Location } from "../../../core/types/LocationType";

export interface StockModel {
  id: string;
  location_id: string;
  type: Location;
  stock_datas: StockDataModel[];
  created_at: Date;
  updated_at?: Date;
}

export interface StockDataModel {
  product_id: string;
  quantity: number;
  threshold?: number;
  stock_id: string
}