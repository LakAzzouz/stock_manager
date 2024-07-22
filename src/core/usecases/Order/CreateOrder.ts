import { Order } from "../../entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { ProductRepository } from "../../repositories/ProductRepository";
import { ProductInfo } from "../../types/ProductInfo";
import { Usecases } from "../Usecase";

type CreateOrderInput = {
  locationId: string,
  productInfos: ProductInfo[];
};

export class CreateOrder implements Usecases<CreateOrderInput, Promise<Order>> {
  constructor(
    private readonly _orderRepository: OrderRepository,
    private readonly _productRepository: ProductRepository
  ) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    const { locationId, productInfos } = input;

    const productInfo = await this._productRepository.getTotalPriceByProductIds(productInfos);

    const totalPrice = productInfo.totalPrice;

    const order = Order.create({
      productInfos,
      locationId,
      totalPrice,
    });

    await this._orderRepository.save(order);

    return order;
  }
}
