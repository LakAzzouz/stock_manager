import { Stock } from "../../../core/entities/Stock";
import { StockModel } from "../models/StockModel";
import { Mapper } from "./Mapper";

export class SqlStockMapper implements Mapper<StockModel, Stock> {
  toDomain(raw: StockModel): Stock {
    const stock = new Stock({
      id: raw.id,
      locationId: raw.location_id,
      type: raw.type,
      stockDatas: raw.stock_datas.map((elm) => {
        return {
          productId: elm.product_id,
          quantity: elm.quantity,
          threshold: elm.threshold,
          stockId: elm.stock_id
        };
      }),
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return stock;
  }

  fromDomain(data: Stock): StockModel {
    const stockModel: StockModel = {
      id: data.props.id,
      location_id: data.props.locationId,
      type: data.props.type,
      stock_datas: data.props.stockDatas.map((elm) => {
        return {
          product_id: elm.productId,
          quantity: elm.quantity,
          threshold: elm.threshold,
          stock_id: elm.stockId
        };
      }),
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return stockModel;
  }
}
