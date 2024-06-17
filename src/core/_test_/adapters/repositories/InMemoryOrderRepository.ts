import { Order } from "../../../entities/Order";
import { OrderErrors } from "../../../errors/OrderErrors";
import { OrderRepository } from "../../../repositories.ts/OrderRepository";

export class InMemoryOrderRepository implements OrderRepository {
  map: Map<string, Order>;

  constructor(map: Map<string, Order>) {
    this.map = map;
  }

  async save(order: Order): Promise<void> {
    this.map.set(order.props.id, order);
  }

  async getById(id: string): Promise<Order> {
    const order = this.map.get(id);
    if (!order) {
      throw new OrderErrors.NotFound();
    }
    return order;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
  }
}
