import { Store } from "../../entities/Store";
import { StoreErrors } from "../../errors/StoreErrors";
import { StoreRepository } from "../../repositories/StoreRepository";

export class InMemoryStoreRepository implements StoreRepository {
  map: Map<string, Store>;

  constructor(map: Map<string, Store>) {
    this.map = map;
  }

  async save(store: Store): Promise<void> {
    this.map.set(store.props.id, store);
  }

  async getById(id: string): Promise<Store | null> {
    const store = this.map.get(id);
    if (!store) {
      return null;
    }
    return store;
  }

  async getByCity(city: string): Promise<Store | null> {
    const arr = Array.from(this.map.values());
    const store = arr.find((elm) => elm.props.city === city);
    if (!store) {
      return null;
    }
    return store;
  }

  async getAllIds(): Promise<string[] | null> {
    const allStores = Array.from(this.map.values());
    const AllStoresIds = allStores.map((elm) => elm.props.id);
    if (!AllStoresIds.length) {
      return null;
    }
    return AllStoresIds;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
