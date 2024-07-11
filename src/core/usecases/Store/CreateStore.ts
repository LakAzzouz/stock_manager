import { Store } from "../../entities/Store";
import { StoreRepository } from "../../repositories/StoreRepository";
import { Usecases } from "../Usecase";

type CreateStoreInput = {
  name: string;
  city: string;
  turnover: number;
  frequentation: number;
};

export class CreateStore implements Usecases<CreateStoreInput, Promise<Store>> {
  constructor(private readonly _storeRepository: StoreRepository) {}

  async execute(input: CreateStoreInput): Promise<Store> {
    const store = Store.create({
      name: input.name,
      city: input.city,
      turnover: input.turnover,
      frequentation: input.frequentation,
    });

    await this._storeRepository.save(store);

    return store;
  }
}
