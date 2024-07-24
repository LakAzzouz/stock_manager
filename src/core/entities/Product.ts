import { v4 } from "uuid";

export enum ProductType {
  SHOES = "shoes",
  TEE_SHIRT = "tee_shirt",
}

export enum Size {
  XS = "xs",
  S = "s",
  M = "m",
  L = "l",
  XL = "xl",
  XXL = "xxl",
}

export type ProductProperties = {
  id: string;
  name: string;
  productType: ProductType;
  price: number;
  size: number;
  image?: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class Product {
  props: ProductProperties;

  constructor(productProperties: ProductProperties) {
    this.props = productProperties;
  }

  static create(props: {name: string, productType: ProductType, price: number, size: number}): Product {
    const product = new Product({
      id: v4(),
      name: props.name,
      productType: props.productType,
      price: props.price,
      size: props.size,
      createdAt: new Date(),
    });
    return product;
  }

  updateImage(image: string): Product {
    this.props.image = image;
    return this;
  }

  update(newPrice: number): Product {
    this.props.price = newPrice;
    return this;
  }
}
