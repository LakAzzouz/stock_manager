import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { ProductRepository } from "../../repositories/ProductRepository";
import { ProductInfo } from "../../types/ProductInfo";

export class InMemoryProductRepository implements ProductRepository {
  map: Map<string, Product>;

  constructor(map: Map<string, Product>) {
    this.map = map;
  }

  async save(product: Product): Promise<void> {
    this.map.set(product.props.id, product);
  }

  async getById(id: string): Promise<Product | null> {
    const product = this.map.get(id);
    if (!product) {
      return null;
    }
    return product;
  }

  async getByName(name: string): Promise<Product | null> {
    const arr = Array.from(this.map.values());
    const product = arr.find((elm) => elm.props.name === name);
    if (!product) {
      return null;
    }
    return product;
  }

  async getTotalPriceByProductIds(productInfo: ProductInfo[]): Promise<{totalPrice: number, productId: string}> {
    const arr = Array.from(this.map.values());
    const totalPrice = productInfo.reduce((sum, info) => {
      const product = arr.find((elm) => elm.props.id === info.productId);
      if (product) {
        sum = {
          totalPrice: sum.totalPrice + product.props.price * info.quantity,
          productId: product.props.id
        }
        return sum
      }
      return sum;
    }, {totalPrice: 0, productId: ""});
    return totalPrice;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
