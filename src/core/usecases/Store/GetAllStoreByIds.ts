import { StoreErrors } from "../../errors/StoreErrors";
import { StoreRepository } from "../../repositories/StoreRepository";
import { Usecases } from "../Usecase";

type GetAllStoreByIdsInput = {
  ids: string[];
};

export class GetAllStoreByIds implements Usecases<GetAllStoreByIdsInput, Promise<string[]>> {
  constructor(private readonly _storeRepository: StoreRepository) {}

  async execute(input: GetAllStoreByIdsInput): Promise<string[]> {
    const stores = await this._storeRepository.getAllIds();

    if (!stores) {
      throw new StoreErrors.NotFound();
    }

    return stores;
  }
}
