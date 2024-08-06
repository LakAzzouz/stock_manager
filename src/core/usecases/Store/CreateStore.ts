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
    const { name, city, turnover, frequentation} = input;

    const store = Store.create({
      name,
      city,
      turnover,
      frequentation
    });

    await this._storeRepository.save(store);

    return store;
  }
}
