import { Order } from "../../entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { StockRepository } from "../../repositories/StockRepository";
import { Usecases } from "../Usecase";

type ValidateOrderInput = {
  id: string;
};

export class ValidateOrder implements Usecases<ValidateOrderInput, Promise<Order>>{
  constructor(
    private readonly _orderRepository: OrderRepository,
    private readonly _stockRepository: StockRepository) {}

  async execute(input: ValidateOrderInput): Promise<Order> {
    const order = await this._orderRepository.getById(input.id)

    order.validate()
  
    await this._orderRepository.save(order)
    
    return order
  }
}
