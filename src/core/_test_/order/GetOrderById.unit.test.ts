import { Order } from "../../entities/Order";
import { OrderRepository } from "../../repositories.ts/OrderRepository";
import { GetOrderById } from "../../usecases/Order/GetOrderById";
import { InMemoryOrderRepository } from "../adapters/repositories/InMemoryOrderRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get order by id", () => {
  let orderRepository: OrderRepository;
  let getOrderById: GetOrderById;
  const orderDb = new Map<string, Order>();

  beforeAll(async () => {
    orderRepository = new InMemoryOrderRepository(orderDb);
    getOrderById = new GetOrderById(orderRepository);
  });

  afterEach(async () => {
    orderDb.clear();
  });

  it("Should get order by id", async () => {
    const order = DataBuilders.generateOrder({});

    orderDb.set(order.props.id, order);

    const result = await getOrderById.execute({
      id: order.props.id,
    });

    expect(result.props.id).toEqual(order.props.id)
  });

  it("Should throw an error because the order is not found", async () => {
    const order = DataBuilders.generateOrder({});

  })

});
