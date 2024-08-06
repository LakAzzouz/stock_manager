import { Store } from "../../entities/Store";
import { StoreErrors } from "../../errors/StoreErrors";
import { StoreRepository } from "../../repositories/StoreRepository";
import { Usecases } from "../Usecase";

type UpdateStoreInput = {
  id: string;
  newPriceReduction: number
};

export class UpdateStore implements Usecases<UpdateStoreInput, Promise<Store>> {
  constructor(private readonly _storeRepository: StoreRepository) {}

  async execute(input: UpdateStoreInput): Promise<Store> {
    const { id, newPriceReduction } = input;

    const store = await this._storeRepository.getById(id);

    if(!store) {
      throw new StoreErrors.NotFound();
    }

    const storeUpdated = store.update(newPriceReduction);

    return storeUpdated;
  }
}
