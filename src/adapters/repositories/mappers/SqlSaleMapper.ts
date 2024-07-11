import { Sale } from "../../../core/entities/Sale";
import { SaleModel } from "../models/SaleModel";
import { Mapper } from "./Mapper";

export class SqlSaleMapper implements Mapper<SaleModel, Sale> {
  toDomain(raw: SaleModel): Sale {
    const sale = new Sale({
      id: raw.id,
      productInfos: raw.product_infos.map((elm) => {
        return {
          productId: elm.product_id,
          quantity: elm.quantity,
        };
      }),
      totalPrice: raw.total_price,
      saleDate: raw.sale_date,
      updatedAt: raw.updated_at,
    });
    return sale;
  }

  fromDomain(data: Sale): SaleModel {
    const saleModel: SaleModel = {
      id: data.props.id,
      product_infos: data.props.productInfos.map((elm) => {
        return {
          product_id: elm.productId,
          quantity: elm.quantity
        };
      }),
      total_price: data.props.totalPrice,
      sale_date: data.props.saleDate,
      updated_at: data.props.updatedAt,
    };
    return saleModel;
  }
}
