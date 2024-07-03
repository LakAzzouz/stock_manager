import { Order } from "../../entities/Order";
import { OrderErrors } from "../../errors/OrderErrors";
import { OrderRepository } from "../../repositories/OrderRepository";
import { DeleteOrder } from "../../usecases/Order/DeleteOrder";
import { InMemoryOrderRepository } from "../adapters/InMemoryOrderRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - delete order", () => {
  let orderRepository: OrderRepository;
  let deleteOrder: DeleteOrder;
  const orderDb = new Map<string, Order>();

  beforeAll(async () => {
    orderRepository = new InMemoryOrderRepository(orderDb);
    deleteOrder = new DeleteOrder(orderRepository);
  });

  afterEach(async () => {
    orderDb.clear();
  });

  it("Should delete order", async () => {
    const order = DataBuilders.generateOrder({});

    orderDb.set(order.props.id, order);

    await deleteOrder.execute({
      id: order.props.id,
    });

    const result = orderDb.get(order.props.id);

    expect(result).toBeUndefined();
  });

  it("Should throw an error because the order is not found", async () => {
    const order = DataBuilders.generateOrder({});

    orderDb.set(order.props.id, order);

    const result = deleteOrder.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(OrderErrors.NotFound);
  });
});
