import express from "express";
import { Order } from "../../core/entities/Order";
import { CreateOrder } from "../../core/usecases/Order/CreateOrder";
import { InMemoryOrderRepository } from "../../core/adapters/repositories/InMemoryOrderRepository";
import { InMemoryProductRepository } from "../../core/adapters/repositories/InMemoryProductRepository";
import { Product } from "../../core/entities/Product";
import { GetOrderById } from "../../core/usecases/Order/GetOrderById";
import { UpdateOrder } from "../../core/usecases/Order/UpdateOrder";
import { DeleteOrder } from "../../core/usecases/Order/DeleteOrder";
import { OrderCreateCommand, OrderUpdateCommand } from "../validation/orderCommands";

export const orderRouter = express.Router();

export const orderDb = new Map<string, Order>();
export const productDb = new Map<string, Product>();

const orderRepository = new InMemoryOrderRepository(orderDb);
const productRepository = new InMemoryProductRepository(productDb);

const createOrder = new CreateOrder(orderRepository, productRepository);
const getOrderById = new GetOrderById(orderRepository);
const updateOrder = new UpdateOrder(orderRepository);
const deleteOrder = new DeleteOrder(orderRepository);

orderRouter.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const { productInfos, locationId } = OrderCreateCommand.validateOrderCreate(req.body)

    const order = await createOrder.execute({
      locationId,
      productInfos,
    });

    const result = {
      id: order.props.id,
      productInfos,
      locationId,
      totalPrice: order.props.totalPrice,
      orderDate: order.props.orderDate,
      status: order.props.status,
      expectedArrivalDate: order.props.expectedArrivalDate,
      dateOfArrival: order.props.dateOfArrival,
    };

    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

orderRouter.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;

    const order = await getOrderById.execute({
      id,
    });

    const result = {
      id,
      productInfos: order.props.productInfos,
      locationId: order.props.locationId,
      totalPrice: order.props.totalPrice,
      orderDate: order.props.orderDate,
      status: order.props.status,
      expectedArrivalDate: order.props.expectedArrivalDate,
      dateOfArrival: order.props.dateOfArrival,
    };

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

orderRouter.patch("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const { newDateOfArrival } = OrderUpdateCommand.validateOrderUpdate(req.body);
      const id = req.params.id;

      const order = await updateOrder.execute({
        id,
        dateOfArrival: newDateOfArrival,
      });

      const result = {
        id,
        productInfos: order.props.productInfos,
        locationId: order.props.locationId,
        totalPrice: order.props.totalPrice,
        orderDate: order.props.orderDate,
        status: order.props.status,
        expectedArrivalDate: order.props.expectedArrivalDate,
        dateOfArrival: newDateOfArrival,
        updatedAt: order.props.updatedAt
      };

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);

orderRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;

      const order = await deleteOrder.execute({
        id,
      });

      const result = "Order deleted";

      res.status(202).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);
