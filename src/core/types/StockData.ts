export enum Threshold {
  STORE = 10,
  WAREHOUSE = 20
}

export interface StockData {
  productId: string; 
  quantity: number;
  threshold?: Threshold;
  stockId: string;
};
