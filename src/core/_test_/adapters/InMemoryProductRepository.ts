import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { ProductRepository } from "../../repositories/ProductRepository";
import { ProductInfo } from "../../valuesObject.ts/ProductInfo";

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
      throw new ProductErrors.NotFound();
    }
    return product;
  }

  async getByName(name: string): Promise<Product> {
    const product = this.map.get(name);
    if (!product) {
      throw new ProductErrors.NotFound();
    }
    return product;
  }

  async getTotalPriceByProductIds(productInfo: ProductInfo[]): Promise<number> {
    const arr = Array.from(this.map.values());
    const totalPrice = productInfo.reduce((sum, info) => {
      const product = arr.find((elm) => elm.props.id === info.productId);
      if (product) {
        return sum + product.props.price * info.quantity;
      }
      return sum;
    }, 0);
    return totalPrice;
  }

  async getQuantityByProductInfos(productInfo: ProductInfo[]): Promise<number> {
    let totalProducts = 0;
    for (const info of productInfo) {
      const product = this.map.get(info.productId);
      if (product) {
        totalProducts += info.quantity;
      } else {
        throw new ProductErrors.NotFound();
      }
    }
    return totalProducts;
  }

  async delete(id: string): Promise<void> {
    const isProductDeleted = this.map.delete(id);
    if (!isProductDeleted) {
      throw new ProductErrors.NotFound();
    }
  }
}
