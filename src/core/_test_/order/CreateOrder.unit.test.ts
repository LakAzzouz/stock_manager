import { Order } from "../../entities/Order";
import { OrderRepository } from "../../repositories.ts/OrderRepository";
import { CreateOrder } from "../../usecases/Order/CreateOrder";
import { InMemoryOrderRepository } from "../adapters/repositories/InMemoryOrderRepository";

describe("Unit - create order", () => {
  let orderRepository: OrderRepository;
  let createOrder: CreateOrder;
  const orderDb = new Map<string, Order>();
  const totalPrice = 300;

  beforeAll(async () => {
    orderRepository = new InMemoryOrderRepository(orderDb);
    createOrder = new CreateOrder(orderRepository);
  });

  afterEach(async () => {
    orderDb.clear();
  });

  it("Should create a order", async () => {
    const result = await createOrder.execute({
      productIds: ["id"],
      totalPrice,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.totalPrice).toEqual(totalPrice);
    expect(result.props.productIds).toEqual(["id"]);
    expect(result.props.orderDate).toBeDefined();
    expect(result.props.dateOfArrival).toBeDefined();
    expect(result.props.updatedAt).toBeDefined();
  });

  it("Should save a order", async () => {
    const order = await createOrder.execute({
      productIds: ["id"],
      totalPrice,
    });

    expect(orderDb.get(order.props.id)).toEqual(order);
  });
});
