import { Order } from "../../entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Usecases } from "../Usecase";

type GetOrderByIdInput = {
  id: string;
};

export class GetOrderById
  implements Usecases<GetOrderByIdInput, Promise<Order>>
{
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute(input: GetOrderByIdInput): Promise<Order> {
    const order = this._orderRepository.getById(input.id);

    return order;
  }
}
