export enum Location {
  STORE = "store",
  WAREHOUSE = "warehouse",
}

export enum Threshold {
  STORE = 10,
  WAREHOUSE = 20
}

export interface StockData {
  type: Location;
  locationId: string; //productId
  quantity: number;
  threshold: Threshold;
};
