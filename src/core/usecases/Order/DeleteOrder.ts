import { OrderRepository } from "../../repositories/OrderRepository";
import { Usecases } from "../Usecase";

type DeleteOrderInput = {
  id: string;
};

export class DeleteOrder implements Usecases<DeleteOrderInput, Promise<void>> {
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute(input: DeleteOrderInput): Promise<void> {
    await this._orderRepository.delete(input.id);

    return;
  }
}
