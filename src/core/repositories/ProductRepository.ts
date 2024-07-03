import { Product } from "../entities/Product";
import { ProductInfo } from "../valuesObject.ts/ProductInfo";

export interface ProductRepository {
  save(product: Product): Promise<void>;

  getById(id: string): Promise<Product>;

  getByName(name: string): Promise<Product>;

  getTotalPriceByProductIds(productInfo: ProductInfo[]): Promise<number>;

  // getQuantityByProductInfos(productInfo: ProductInfo[]): Promise<number>;

  delete(id: string): Promise<void>;
}
