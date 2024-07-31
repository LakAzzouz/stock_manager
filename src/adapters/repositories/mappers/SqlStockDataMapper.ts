import { StockData } from "../../../core/entities/StockData";
import { StockDataModel } from "../models/StockDataModel";
import { Mapper } from "./Mapper";

export class SqlStockDataMapper implements Mapper<StockDataModel, StockData> {
  toDomain(raw: StockDataModel): StockData {
    const stockData = new StockData({
      id: raw.id,
      productId: raw.product_id,
      stockId: raw.stock_id,
      quantity: raw.quantity,
      threshold: raw.threshold,
    });
    return stockData;
  }

  fromDomain(data: StockData): StockDataModel {
    const stockDataModel = {
      id: data.props.id,
      product_id: data.props.productId,
      stock_id: data.props.stockId,
      quantity: data.props.quantity,
      threshold: data.props.threshold,
    };
    return stockDataModel;
  }
}
