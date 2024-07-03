import { v4 } from "uuid";
import { ProductInfo } from "../valuesObject.ts/ProductInfo";

export type SaleProperties = {
  id: string;
  productInfos: ProductInfo[];
  totalPrice: number;
  saleDate: Date;
  updatedAt?: Date;
};

export class Sale {
  props: SaleProperties;

  constructor(saleProperties: SaleProperties) {
    this.props = saleProperties;
  }

  static create(props: {productInfos: ProductInfo[], totalPrice: number}): Sale {
    const sale = new Sale({
      id: v4(),
      productInfos: props.productInfos,
      totalPrice: props.totalPrice,
      saleDate: new Date(),
    });
    return sale;
  }

  update(newTotalPrice: number): Sale {
    this.props.totalPrice = newTotalPrice;
    return this;
  }
}
