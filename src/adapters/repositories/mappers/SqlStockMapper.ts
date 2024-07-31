import { Stock } from "../../../core/entities/Stock";
import { StockModel } from "../models/StockModel";
import { Mapper } from "./Mapper";

export class SqlStockMapper implements Mapper<StockModel, Stock> {
  toDomain(raw: StockModel): Stock {
    const stock = new Stock({
      id: raw.id,
      locationId: raw.location_id,
      stockDatas: raw.stock_datas.map((elm) => {
        return {
          props: {
            id: elm.id,
            productId: elm.product_id,
            stockId: elm.stock_id,
            quantity: elm.quantity,
            threshold: elm.threshold,
          },
        };
      }),
      type: raw.type,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return stock;
  }

  fromDomain(data: Stock): StockModel {
    const stockModel: StockModel = {
      id: data.props.id,
      location_id: data.props.locationId,
      stock_datas: data.props.stockDatas.map((elm) => {
        return {
          id: elm.props.id,
          product_id: elm.props.productId,
          stock_id: elm.props.stockId,
          quantity: elm.props.quantity,
          threshold: elm.props.threshold,
        };
      }),
      type: data.props.type,
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return stockModel;
  }
}
