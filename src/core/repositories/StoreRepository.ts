import { Store } from "../entities/Store";

export interface StoreRepository {
  save(store: Store): Promise<void>;

  getById(id: string): Promise<Store | null>;

  getByCity(city: string): Promise<Store | null>;

  getAllIds(): Promise<string[] | null>;

  delete(id: string): Promise<void | null>
}
