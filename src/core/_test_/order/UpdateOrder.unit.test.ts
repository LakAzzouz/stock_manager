import { Order } from "../../entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { UpdateOrder } from "../../usecases/Order/UpdateOrder";
import { InMemoryOrderRepository } from "../../adapters/repositories/InMemoryOrderRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - update order", () => {
  let orderRepository: OrderRepository;
  let updateOrder: UpdateOrder;
  const orderDb = new Map<string, Order>();
  const newDateOfArrival = new Date(1)

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
});
