import express from "express";
import supertest from "supertest";

import { OrderRepository } from "../../core/repositories/OrderRepository";
import { UserRepository } from "../../core/repositories/UserRepository";
import { orderRouter } from "../routes/order";
import { SqlOrderMapper } from "../../adapters/repositories/mappers/SqlOrderMapper";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";
import { SqlOderRepository } from "../../adapters/repositories/SQL/SqlOrderRepository";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { DataBuilders } from "../../core/_test_/tools/DataBuilders";
import { ProductRepository } from "../../core/repositories/ProductRepository";
import { SqlProductMapper } from "../../adapters/repositories/mappers/SqlProductMapper";
import { SqlProductRepository } from "../../adapters/repositories/SQL/SqlProductRepository";

const app = express();
const { sign } = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

describe("E2E - order", () => {
  let orderRepository: OrderRepository;
  let userRepository: UserRepository;
  let productRepository: ProductRepository;
  let authorization;

  const user = DataBuilders.generateUser();
  const order = DataBuilders.generateOrder();
  const product = DataBuilders.generateProduct()

  beforeAll(async () => {
    app.use(express.json());
    app.use("/orders", orderRouter);

    const orderMapper = new SqlOrderMapper();
    const userMapper = new SqlUserMapper();
    const productMapper = new SqlProductMapper()
    orderRepository = new SqlOderRepository(dbTest, orderMapper);
    userRepository = new SqlUserRepository(dbTest, userMapper);
    productRepository = new SqlProductRepository(dbTest, productMapper)
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE orders`);
    await dbTest.raw(`TRUNCATE TABLE users`);
  });

  it("POST /orders/create", async () => {
    await userRepository.save(user)
    await productRepository.save(product)
    await orderRepository.save(order)

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/orders/create")
      .set("authorization", authorization)
      .send({
        productInfos: order.props.productInfos,
        locationId: order.props.locationId,
      });

    const responseBody = response.body;
    console.log(response)
    expect(responseBody.id).toBeDefined();
    expect(responseBody.productInfos).toEqual(order.props.productInfos);
    expect(responseBody.locationId).toEqual(order.props.locationId);
    expect(responseBody.totalPrice).toEqual(order.props.totalPrice);
    expect(responseBody.orderDate).toEqual(order.props.orderDate);
    expect(responseBody.status).toEqual(order.props.status);
    expect(responseBody.expectedArrivalDate).toEqual(order.props.expectedArrivalDate);
    expect(responseBody.dateOfArrival).toEqual(order.props.dateOfArrival);
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /users/create should return a status 400", async () => {

  })
});
