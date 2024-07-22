import { Knex } from "knex";
import { StoreRepository } from "../../../core/repositories/StoreRepository";
import { SqlStoreMapper } from "../mappers/SqlStoreMapper";
import { Store } from "../../../core/entities/Store";

export class SqlStoreRepository implements StoreRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _storeMapper: SqlStoreMapper
  ) {}

  async save(store: Store): Promise<void> {
    const storeModel = this._storeMapper.fromDomain(store);
    await this._knex.raw(
      `INSERT INTO stores (id, name, city, turnover, frequentation, price_reduction, created_at, updated_at)
        VALUES (:id, :name, :city, :turnover, :frequentation, :price_reduction, :created_at, :updated_at)`,
      {
        id: storeModel.id,
        name: storeModel.name,
        city: storeModel.city,
        turnover: storeModel.turnover,
        frequentation: storeModel.frequentation,
        price_reduction: storeModel.price_reduction,
        created_at: storeModel.created_at,
        updated_at: storeModel.updated_at,
      }
    );
  }

  async getById(id: string): Promise<Store | null> {
    const storeModel = await this._knex.raw(
      `SELECT * FROM stores WHERE id = :id`,
      {
        id: id,
      }
    );

    const store = this._storeMapper.toDomain(storeModel[0][0]);

    return store;
  }

  async getByCity(city: string): Promise<Store> {
    const storeModel = await this._knex.raw(
      `SELECT * FROM stores WHERE city = :city`,
      {
        city: city,
      }
    );

    const store = this._storeMapper.toDomain(storeModel[0][0]);

    return store;
  }

  async getAllIds(): Promise<string[] | null> {
    const storeIdsColumn = await this._knex.raw<[{ id: string }[], any[]]>(`SELECT id FROM stores`);

    const storesIds = storeIdsColumn[0].map((elm) => elm.id)

    return storesIds;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(`DELETE FROM stores WHERE id = :id`, {
      id: id,
    });
  }
}
