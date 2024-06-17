import { Product } from "../entities/Product";

export interface ProductRepository {
  save(product: Product): Promise<void>;

  getById(id: string): Promise<Product>;

  getByName(name: string): Promise<Product>;

  delete(id: string): Promise<void>;
}
