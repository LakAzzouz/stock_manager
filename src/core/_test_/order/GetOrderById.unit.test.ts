import { Order } from "../../entities/Order";
import { OrderErrors } from "../../errors/OrderErrors";
import { OrderRepository } from "../../repositories/OrderRepository";
import { GetOrderById } from "../../usecases/Order/GetOrderById";
import { InMemoryOrderRepository } from "../adapters/InMemoryOrderRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get order by id", () => {
  let orderRepository: OrderRepository;
  let getOrderById: GetOrderById;
  const orderDb = new Map<string, Order>();
  const id = "id";
  const totalPrice = 75;
  const orderDate = new Date();
  const dateOfArrival = new Date();
  const updatedAt = new Date();
  const productId = "product_id";
  const quantity = 10
  const productInfos = [{
    productId,
    quantity
  }]

  beforeAll(async () => {
    orderRepository = new InMemoryOrderRepository(orderDb);
    getOrderById = new GetOrderById(orderRepository);
  });

  afterEach(async () => {
    orderDb.clear();
  });

  it("Should get order by id", async () => {
    const order = DataBuilders.generateOrder({
      id,
      productInfos,
      totalPrice,
      orderDate,
      dateOfArrival,
      updatedAt,
    });

    orderDb.set(order.props.id, order);

    const result = await getOrderById.execute({
      id: order.props.id,
    });

    expect(result.props.id).toEqual(order.props.id);
  });

  it("Should throw an error because the order is not found", async () => {
    const order = DataBuilders.generateOrder({});

    orderDb.set(order.props.id, order);

    const result = getOrderById.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(OrderErrors.NotFound);
  });
});
