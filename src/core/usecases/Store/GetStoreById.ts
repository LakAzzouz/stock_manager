import { Store } from "../../entities/Store";
import { StoreRepository } from "../../repositories/StoreRepository";
import { Usecases } from "../Usecase";

type GetStoreByIdInput = {
  id: string;
};

export class GetStoreById implements Usecases<GetStoreByIdInput, Promise<Store>>{
  constructor(private readonly _storeRepository: StoreRepository) {}

  async execute(input: GetStoreByIdInput): Promise<Store> {
    const store = await this._storeRepository.getById(input.id);

    return store;
  }
}
