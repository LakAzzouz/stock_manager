import { Stock } from "../../entities/Stock";
import { StockErrors } from "../../errors/StockErrors";
import { StockRepository } from "../../repositories/StockRepository";
import { ProductInfo } from "../../valuesObject.ts/ProductInfo";

export class InMemoryStockRepository implements StockRepository {
  map: Map<string, Stock>;

  constructor(map: Map<string, Stock>) {
    this.map = map;
  }

  async save(stock: Stock): Promise<void> {
    this.map.set(stock.props.id, stock);
  }

  async getById(id: string): Promise<Stock> {
    const stock = this.map.get(id);
    if (!stock) {
      throw new StockErrors.NotFound();
    }
    return stock;
  }

  async ensureThatDoesNotExistByProductId(productId: string): Promise<void> {
    const stocks = Array.from(this.map.values());
    const stock = stocks.find((stock) => stock.props.productId === productId);
    if (stock) {
      throw new StockErrors.AlReadyExists();
    }
  }

  async delete(id: string): Promise<void> {
    const isStockDeleted = this.map.delete(id);
    if (!isStockDeleted) {
      throw new StockErrors.NotFound();
    }
  }

  

  // async updateByOrder(productInfo: ProductInfo[]): Promise<Stock> {
  //   const stocks = 
  // }
}
