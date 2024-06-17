import { StoreRepository } from "../../repositories.ts/StoreRepository";
import { Usecases } from "../Usecase";

type DeleteStoreInput = {
  id: string;
};

export class DeleteStore implements Usecases<DeleteStoreInput, Promise<void>> {
  constructor(private readonly _storeRepository: StoreRepository) {}

  async execute(input: DeleteStoreInput): Promise<void> {    
    const result = await this._storeRepository.delete(input.id);

    return;
  }
}
