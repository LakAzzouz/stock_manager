import { Product } from "../../../entities/Product";
import { ProductErrors } from "../../../errors/ProductErrors";
import { ProductRepository } from "../../../repositories.ts/ProductRepository";

export class InMemoryProductRepository implements ProductRepository {
  map: Map<string, Product>;

  constructor(map: Map<string, Product>) {
    this.map = map;
  }

  async save(product: Product): Promise<void> {
    this.map.set(product.props.id, product);
  }

  async getById(id: string): Promise<Product> {
    const product = this.map.get(id);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND")
    }
    return product;
  }

  async getByName(name: string): Promise<Product> {
    const product = this.map.get(name);
    if (!product) {
      throw new ProductErrors.NotFound()
    }
    return product;
  }

  async delete(id: string): Promise<void> {
    const isProductDeleted = this.map.delete(id);
    if(!isProductDeleted){
      throw new ProductErrors.NotFound()
    }
    return
  }
}
