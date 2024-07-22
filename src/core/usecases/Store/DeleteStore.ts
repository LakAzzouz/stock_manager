import { StoreErrors } from "../../errors/StoreErrors";
import { StoreRepository } from "../../repositories/StoreRepository";
import { Usecases } from "../Usecase";

type DeleteStoreInput = {
  id: string;
};

export class DeleteStore implements Usecases<DeleteStoreInput, Promise<void>> {
  constructor(private readonly _storeRepository: StoreRepository) {}

  async execute(input: DeleteStoreInput): Promise<void> {
    const { id } = input;

    const store = await this._storeRepository.getById(id);

    if (!store) {
      throw new StoreErrors.NotFound();
    }

    await this._storeRepository.delete(store.props.id);

    return;
  }
}
