import { Store } from "../../entities/Store";
import { StoreRepository } from "../../repositories/StoreRepository";
import { Usecases } from "../Usecase";

type UpdateStoreInput = {
  id: string;
  newPriceReduction: number
};

export class UpdateStore implements Usecases<UpdateStoreInput, Promise<Store>> {
  constructor(private readonly _storeRepository: StoreRepository) {}

  async execute(input: UpdateStoreInput): Promise<Store> {
    const store = await this._storeRepository.getById(input.id);

    const storeUpdated = store.update(input.newPriceReduction);

    return storeUpdated
  }
}
