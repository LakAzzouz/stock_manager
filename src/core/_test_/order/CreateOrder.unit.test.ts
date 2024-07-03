import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { OrderRepository } from "../../repositories/OrderRepository";
import { ProductRepository } from "../../repositories/ProductRepository";
import { OrderStatus } from "../../types/OrderStatus";
import { CreateOrder } from "../../usecases/Order/CreateOrder";
import { InMemoryOrderRepository } from "../adapters/InMemoryOrderRepository";
import { InMemoryProductRepository } from "../adapters/InMemoryProductRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - create order", () => {
  let orderRepository: OrderRepository;
  let productRepository: ProductRepository;
  let createOrder: CreateOrder;
  const orderDb = new Map<string, Order>();
  const productDb = new Map<string, Product>();
  const productId = "product_id";
  const locationId = "location_id"
  const quantity = 10;
  const productInfos = [
    {
      productId,
      quantity,
    },
  ];

  beforeAll(async () => {
    orderRepository = new InMemoryOrderRepository(orderDb);
    productRepository = new InMemoryProductRepository(productDb);
    createOrder = new CreateOrder(orderRepository, productRepository);
  });

  afterEach(async () => {
    orderDb.clear();
    productDb.clear();
  });

  it("Should create a order", async () => {
    const product = DataBuilders.generateProduct({
      id: productId,
    });

    productDb.set(product.props.id, product);

    const result = await createOrder.execute({
      productInfos,
      locationId
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.orderDate).toBeDefined();
    expect(result.props.expectedArrivalDate).toBeDefined();
    expect(result.props.status).toEqual(OrderStatus.IN_PROGRESS);
    expect(result.props.productInfos).toEqual(productInfos);
    expect(result.props.totalPrice).toEqual(product.props.price * quantity);
  });
});
