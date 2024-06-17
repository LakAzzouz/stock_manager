import { Store } from "../entities/Store";

export interface StoreRepository {
  save(store: Store): Promise<void>;

  getById(id: string): Promise<Store>;

  getByCity(city: string): Promise<Store>;

  delete(id: string): Promise<void>
}
