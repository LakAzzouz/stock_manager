import { Knex } from "knex";
import { ProductRepository } from "../../../core/repositories/ProductRepository";
import { SqlProductMapper } from "../mappers/SqlProductMapper";
import { Product } from "../../../core/entities/Product";
import { ProductInfo } from "../../../core/types/ProductInfo";

export class SqlProductRepository implements ProductRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _productMapper: SqlProductMapper
  ) {}

  update(product: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async save(product: Product): Promise<void> {
    const productModel = this._productMapper.fromDomain(product);
    await this._knex.raw(
      `INSERT INTO products (id, name, product_type, image, price, size, created_at, updated_at)
        VALUES (:id, :name, :product_type, :image, :price, :size, :created_at, :updated_at)`,
      {
        id: productModel.id,
        name: productModel.name,
        product_type: productModel.product_type,
        image: productModel.image || null,
        price: productModel.price,
        size: productModel.size,
        created_at: productModel.created_at,
        updated_at: productModel.updated_at ? productModel.updated_at : null,
      }
    );
  }

  async getById(id: string): Promise<Product> {
    const productModel = await this._knex.raw(
      `SELECT * FROM products WHERE id = :id`,
      {
        id: id,
      }
    );

    const product = this._productMapper.toDomain(productModel[0][0]);

    return product;
  }

  async getByName(name: string): Promise<Product> {
    const productModel = await this._knex.raw(
      `SELECT * FROM products WHERE name = :name`,
      {
        name: name,
      }
    );
    const product = this._productMapper.toDomain(productModel[0][0]);

    return product;
  }

  async getTotalPriceByProductIds(productInfo: ProductInfo[]): Promise<number> {
    const productIds = productInfo.map((elm) => elm.productId);
    const productModel = await this._knex.raw(
      `SELECT SUM(products.price * product_infos.quantity) AS total_price
      FROM product_infos 
      JOIN products ON product_infos.product_id = products.id
      WHERE product_infos.product_id IN (:product_id)`,
      {
        product_id: productIds
      }
    );

    const totalPrice = productModel[0][0].total_price

    return totalPrice;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(`DELETE FROM products WHERE id = :id`, {
      id: id,
    });
  }
}
