import express from "express";

import { CreateOrder } from "../../core/usecases/Order/CreateOrder";
import { GetOrderById } from "../../core/usecases/Order/GetOrderById";
import { UpdateOrder } from "../../core/usecases/Order/UpdateOrder";
import { DeleteOrder } from "../../core/usecases/Order/DeleteOrder";
import {OrderCreateCommand, OrderUpdateCommand} from "../validation/orderCommands";
import { SqlOderRepository } from "../../adapters/repositories/SQL/SqlOrderRepository";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlOrderMapper } from "../../adapters/repositories/mappers/SqlOrderMapper";
import { SqlProductMapper } from "../../adapters/repositories/mappers/SqlProductMapper";
import { SqlProductRepository } from "../../adapters/repositories/SQL/SqlProductRepository";
import { ValidateOrder } from "../../core/usecases/Order/ValidateOrder";
import { Auth } from "../../adapters/middlewares/auth";

export const orderRouter = express.Router();

const productMapper = new SqlProductMapper();
const sqlProductRepository = new SqlProductRepository(dbTest, productMapper);

const orderMapper = new SqlOrderMapper();
const sqlOrderRepository = new SqlOderRepository(dbTest, orderMapper);

const createOrder = new CreateOrder(sqlOrderRepository, sqlProductRepository);
const getOrderById = new GetOrderById(sqlOrderRepository);
const updateOrder = new UpdateOrder(sqlOrderRepository);
const deleteOrder = new DeleteOrder(sqlOrderRepository);
const validateOrder = new ValidateOrder(sqlOrderRepository);

orderRouter.use(Auth);
orderRouter.post("/create", async (req: express.Request, res: express.Response) => {
  try {
    const { productInfos, locationId } = OrderCreateCommand.validateOrderCreate(req.body);

    const order = await createOrder.execute({ locationId, productInfos });

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

    return res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

orderRouter.get("/validate/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;

      const result = await validateOrder.execute({
        id,
      });

      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

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

    return res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
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
        updatedAt: order.props.updatedAt,
      };

      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

orderRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;

      await deleteOrder.execute({
        id,
      });

      return res.sendStatus(200)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);
