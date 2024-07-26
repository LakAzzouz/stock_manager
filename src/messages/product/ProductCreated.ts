import { ProductType } from "../../core/entities/Product";

export type ProductCreatedProperties = {
  name: string;
  productType: ProductType;
  price: number;
  size: number;
};

export class ProductCreated {
  props: ProductCreatedProperties;

  constructor(productEventProperties: ProductCreatedProperties) {
    this.props = productEventProperties;
  }
}
