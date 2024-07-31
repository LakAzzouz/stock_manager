import { Location } from "../../../core/types/LocationType";
import { StockDataModel } from "./StockDataModel";

export interface StockModel {
  id: string;
  location_id: string;
  stock_datas: StockDataModel[];
  type: Location;
  created_at: Date;
  updated_at?: Date;
}
