import { Store } from "../../entities/Store";
import { StoreRepository } from "../../repositories/StoreRepository";
import { Usecases } from "../Usecase";

type GetStoreByCityInput = {
  city: string;
};

export class GetStoreByCity implements Usecases<GetStoreByCityInput, Promise<Store>> {
  constructor(private readonly _storeRepository: StoreRepository) {}

  async execute(input: GetStoreByCityInput): Promise<Store> {
    const store = await this._storeRepository.getByCity(input.city);

    return store;
  }
}
