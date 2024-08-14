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

  async save(product: Product): Promise<void> {
    const productModel = this._productMapper.fromDomain(product);
    await this._knex.raw(
      `INSERT INTO products (id, name, product_type, price, size, created_at, updated_at)
        VALUES (:id, :name, :product_type, :price, :size, :created_at, :updated_at)`,
      {
        id: productModel.id,
        name: productModel.name,
        product_type: productModel.product_type,
        price: productModel.price,
        size: productModel.size,
        created_at: productModel.created_at,
        updated_at: productModel.updated_at ? productModel.updated_at : null,
      }
    );
  }

  async getById(id: string): Promise<Product | null> {
    const productModel = await this._knex.raw(
      `SELECT * 
      FROM products 
      WHERE id = :id`,
      {
        id: id,
      }
    );

    if(!productModel[0][0]) {
      return null
    }

    const product = this._productMapper.toDomain(productModel[0][0]);


    return product;
  }

  async getByName(name: string): Promise<Product | null> {
    const productModel = await this._knex.raw(
      `SELECT * 
      FROM products 
      WHERE name = :name`,
      {
        name: name,
      }
    );

    if(!productModel[0][0]) {
      return null
    }

    const product = this._productMapper.toDomain(productModel[0][0]);

    return product;
  }

  async getTotalPriceByProductIds(
    productInfos: ProductInfo[]
  ): Promise<number> {
    const productIds = productInfos.map((elm) => elm.productId);
    const priceIdPairModel = await this._knex.raw(
      `SELECT price, id 
      FROM products
      WHERE products.id IN (?)
      `,
      [productIds]
    );
    const pricePair: {
      price: number;
      id: string;
    }[] = priceIdPairModel[0].map((elm: { price: number; id: string }) => {
      return {
        price: elm.price,
        id: elm.id,
      };
    });

    const totalPrice = pricePair.reduce(
      (acc: number, pair: { price: number; id: string }): number => {
        const productInfo = productInfos.find(
          (elm) => elm.productId === pair.id
        );
        if (!productInfo?.quantity) {
          throw new Error("");
        }
        return (acc += productInfo.quantity * pair.price);
      },
      0
    );

    return totalPrice;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(
      `
    DELETE FROM products 
    WHERE id = :id`,
      {
        id: id,
      }
    );
  }
}
