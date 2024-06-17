import { Store } from "../../../entities/Store";
import { StoreErrors } from "../../../errors/StoreErrors";
import { StoreRepository } from "../../../repositories.ts/StoreRepository";

export class InMemoryStoreRepository implements StoreRepository {
  map: Map<string, Store>;

  constructor(map: Map<string, Store>) {
    this.map = map;
  }

  async save(store: Store): Promise<void> {
    this.map.set(store.props.id, store);
  }

  async getById(id: string): Promise<Store> {
    const store = this.map.get(id);
    if (!store) {
      throw new StoreErrors.NotFound
    }
    return store;
  }

  async getByCity(city: string): Promise<Store> {
    const store = this.map.get(city);
    if (!store) {
      throw new StoreErrors.NotFound
    }
    return store;
  }

  async delete(id: string): Promise<void> {
    const isStoreDeleted = this.map.delete(id)
    if(!isStoreDeleted){
      throw new StoreErrors.NotFound
    }
  }
}
