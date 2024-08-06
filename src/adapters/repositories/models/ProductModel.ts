import { ProductType } from "../../../core/types/ProductType";

export interface ProductModel {
  id: string;
  name: string;
  product_type: ProductType;
  price: number;
  size: number;
  created_at: Date;
  updated_at?: Date;
}
