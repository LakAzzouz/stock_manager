import { ProductType } from "../../../core/entities/Product";

export interface ProductModel {
  id: string;
  name: string;
  product_type: ProductType;
  image?: string;
  price: number;
  size: number;
  created_at: Date;
  updated_at?: Date;
}
