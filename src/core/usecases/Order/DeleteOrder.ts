import { OrderErrors } from "../../errors/OrderErrors";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Usecases } from "../Usecase";

type DeleteOrderInput = {
  id: string;
};

export class DeleteOrder implements Usecases<DeleteOrderInput, Promise<void>> {
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute(input: DeleteOrderInput): Promise<void> {
    const { id } = input;

    const order = await this._orderRepository.getById(id);

    if (!order) {
      throw new OrderErrors.NotFound();
    }

    await this._orderRepository.delete(order.props.id);

    return;
  }
}
