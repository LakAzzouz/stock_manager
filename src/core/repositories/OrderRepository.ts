import { Order } from "../entities/Order";

export interface OrderRepository {
  save(order: Order): Promise<void>;

  getById(id: string): Promise<Order | null>;

  update(order: Order): Promise<Order>;

  delete(id: string): Promise<void>;
}
