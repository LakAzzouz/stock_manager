import { Order } from "../../entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { UpdateOrder } from "../../usecases/Order/UpdateOrder";
import { InMemoryOrderRepository } from "../../adapters/repositories/InMemoryOrderRepository";
import { DataBuilders } from "../tools/DataBuilders";
import { OrderErrors } from "../../errors/OrderErrors";

describe("Unit - update order", () => {
  let orderRepository: OrderRepository;
  let updateOrder: UpdateOrder;
  const orderDb = new Map<string, Order>();
  const newDateOfArrival = new Date(1)
  const id = "id"

  beforeAll(async () => {
    orderRepository = new InMemoryOrderRepository(orderDb);
    updateOrder = new UpdateOrder(orderRepository);
  });

  afterEach(async () => {
    orderDb.clear();
  });

  it("Should update order", async () => {
    const order = DataBuilders.generateOrder({})

    orderDb.set(order.props.id, order)

    const result = await updateOrder.execute({
        id: order.props.id,
        dateOfArrival: newDateOfArrival
    })

    expect(result.props.dateOfArrival).toEqual(newDateOfArrival)
  });

  it("Should an error because order is not found", async () => {
    const result = updateOrder.execute({
      id,
      dateOfArrival: newDateOfArrival
  });

  await expect(result).rejects.toThrow(OrderErrors.NotFound);
  })
});
