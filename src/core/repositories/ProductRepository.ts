import { Product } from "../entities/Product";
import { ProductInfo } from "../types/ProductInfo";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  
  getById(id: string): Promise<Product | null>;
  
  getByName(name: string): Promise<Product | null>;
  
  getTotalPriceByProductIds(productInfo: ProductInfo[]): Promise<number>;
  
  delete(id: string): Promise<void>;
}
