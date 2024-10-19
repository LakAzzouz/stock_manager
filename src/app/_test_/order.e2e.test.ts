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

  const user = DataBuilders.generateUser({});

  const product = DataBuilders.generateProduct({
    id: "product_id",
    price: 100,
  });

  const order = DataBuilders.generateOrder({
    productInfos: [
      {
        productId: product.props.id,
        quantity: 1,
      },
    ],
  });

  beforeAll(async () => {
    app.use(express.json());
    app.use("/orders", orderRouter);

    const orderMapper = new SqlOrderMapper();
    const userMapper = new SqlUserMapper();
    const productMapper = new SqlProductMapper();
    orderRepository = new SqlOderRepository(dbTest, orderMapper);
    userRepository = new SqlUserRepository(dbTest, userMapper);
    productRepository = new SqlProductRepository(dbTest, productMapper);
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE users`);
    await dbTest.raw(`TRUNCATE TABLE products`);
    await dbTest.raw(`TRUNCATE TABLE orders`);
    await dbTest.raw(`TRUNCATE TABLE product_infos`);
  });

  it("POST /orders/create", async () => {
    await productRepository.save(product);

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
    expect(responseBody.id).toBeDefined();
    expect(responseBody.productInfos).toEqual(order.props.productInfos);
    expect(responseBody.locationId).toEqual(order.props.locationId);
    expect(responseBody.totalPrice).toEqual(product.props.price * order.props.productInfos[0].quantity);
    expect(responseBody.orderDate).toBeDefined();
    expect(responseBody.status).toEqual(order.props.status);
    expect(responseBody.expectedArrivalDate).toBeDefined();
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /orders/create should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/orders/create")
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("POST /orders/validate/:id", async () => {
    await userRepository.save(user);
    await orderRepository.save(order);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post(`/orders/validate/${order.props.id}`)
      .set("authorization", authorization);
    const responseBody = response.body;
    expect(responseBody.msg).toEqual("Your order has been validated");
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("POST /orders/validate/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post(`/orders/validate/${order.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("GET /orders/:id", async () => {
    await userRepository.save(user);
    await orderRepository.save(order);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/orders/${order.props.id}`)
      .set("authorization", authorization);
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.productInfos).toEqual(order.props.productInfos);
    expect(responseBody.locationId).toEqual(order.props.locationId);
    expect(responseBody.totalPrice).toEqual(
      product.props.price * order.props.productInfos[0].quantity
    );
    expect(responseBody.orderDate).toBeDefined();
    expect(responseBody.status).toEqual(order.props.status);
    expect(responseBody.expectedArrivalDate).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("GET /orders/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/orders/${order.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("PATCH /orders/:id", async () => {
    await productRepository.save(product);
    await orderRepository.save(order);
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .patch(`/orders/${order.props.id}`)
      .set("authorization", authorization)
      .send({
        id: order.props.id,
        newDateOfArrival: order.props.dateOfArrival,
      });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.productInfos).toEqual(order.props.productInfos);
    expect(responseBody.locationId).toEqual(order.props.locationId);
    expect(responseBody.totalPrice).toEqual(order.props.productInfos[0].quantity * product.props.price);
    expect(responseBody.orderDate).toBeDefined();
    expect(responseBody.status).toEqual(order.props.status);
    expect(responseBody.expectedArrivalDate).toBeDefined();
    expect(responseBody.dateOfArrival).toBeDefined();
    expect(responseBody.updatedAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("PATCH /orders/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .patch(`/orders/${order.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("DELETE /orders/:id", async () => {
    await userRepository.save(user);
    await orderRepository.save(order);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/orders/${order.props.id}`)
      .set("authorization", authorization);
    const responseStatus = response.status;
    expect(responseStatus).toBe(200);
    jest.setTimeout(1000);
  });

  it("DELETE /orders/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/orders/${order.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });
});
