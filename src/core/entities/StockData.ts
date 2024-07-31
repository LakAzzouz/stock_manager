import { v4 } from "uuid";
import { Threshold } from "../types/StockData";

export type StockDataProperties = {
  id: string;
  stockId: string;
  productId: string;
  quantity: number;
  threshold?: Threshold;
};

export class StockData {
  props: StockDataProperties;

  constructor(stockDataProperties: StockDataProperties) {
    this.props = stockDataProperties;
  }

  static create(props: { stockId: string; productId: string }): StockData {
    const stockData = new StockData({
      id: v4(),
      stockId: props.stockId,
      productId: props.productId,
      quantity: 0,
    });
    return stockData;
  }
}
