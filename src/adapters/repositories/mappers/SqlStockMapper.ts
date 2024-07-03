import { Stock } from "../../../core/entities/Stock";
import { StockModel } from "../models/StockModel";
import { Mapper } from "./Mapper";

export class SqlStockMapper implements Mapper<StockModel, Stock> {
  toDomain(raw: StockModel): Stock {
    const stock = new Stock({
      id: raw.id,
      productId: raw.product_id,
      stockByLocation: raw.stock_by_location,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return stock;
  }

  fromDomain(data: Stock): StockModel {
    const stockModel: StockModel = {
      id: data.props.id,
      product_id: data.props.productId,
      stock_by_location: data.props.stockByLocation,
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return stockModel;
  }
}
