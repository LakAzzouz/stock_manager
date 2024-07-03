import { Product } from "../../../core/entities/Product";
import { ProductModel } from "../models/ProductModel";
import { Mapper } from "./Mapper";

export class SqlProductMapper implements Mapper<ProductModel, Product> {
  toDomain(raw: ProductModel): Product {
    const product = new Product({
      id: raw.id,
      name: raw.name,
      productType: raw.product_type,
      image: raw.image,
      price: raw.price,
      size: raw.size,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return product;
  }
  fromDomain(data: Product): ProductModel {
    const productModel: ProductModel = {
      id: data.props.id,
      name: data.props.name,
      product_type: data.props.productType,
      image: data.props.image,
      price: data.props.price,
      size: data.props.size,
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return productModel;
  }
}
