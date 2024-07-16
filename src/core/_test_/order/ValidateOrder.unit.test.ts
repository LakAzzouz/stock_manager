import { InMemoryOrderRepository } from "../../adapters/repositories/InMemoryOrderRepository";
import { Order } from "../../entities/Order";
import { OrderErrors } from "../../errors/OrderErrors";
import { OrderRepository } from "../../repositories/OrderRepository";
import { ValidateOrder } from "../../usecases/Order/ValidateOrder";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - validate order", () => {
  let orderRepository: OrderRepository;
  let validateOrder: ValidateOrder;
  const orderDb = new Map<string, Order>();
  const order = DataBuilders.generateOrder({
    id: "id",
  });

  beforeAll(async () => {
    orderRepository = new InMemoryOrderRepository(orderDb);
    validateOrder = new ValidateOrder(orderRepository);
  });

  afterEach(async () => {
    orderDb.clear();
  });

  it("Should validate order", async () => {
    orderDb.set(order.props.id, order);

    const result = await validateOrder.execute({
      id: order.props.id,
    });

    expect(result).toEqual(order);
  });

  it("Should throw an error because order is not found", async () => {
    const result = validateOrder.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(OrderErrors.NotFound);
  });
});
