import { Store } from "../../entities/Store";
import { StoreErrors } from "../../errors/StoreErrors";
import { StoreRepository } from "../../repositories/StoreRepository";
import { Usecases } from "../Usecase";

type GetStoreByIdInput = {
  id: string;
};

export class GetStoreById implements Usecases<GetStoreByIdInput, Promise<Store>>{
  constructor(private readonly _storeRepository: StoreRepository) {}

  async execute(input: GetStoreByIdInput): Promise<Store> {
    const { id } = input;

    const store = await this._storeRepository.getById(id);

    if(!store) {
      throw new StoreErrors.NotFound();
    }

    return store;
  }
}
