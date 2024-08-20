import express from "express";
import supertest from "supertest";

import { SqlSaleRepository } from "../../adapters/repositories/SQL/SqlSaleRepository";
import { saleRouter } from "../routes/sale";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlProductRepository } from "../../adapters/repositories/SQL/SqlProductRepository";
import { SqlSaleMapper } from "../../adapters/repositories/mappers/SqlSaleMapper";
import { SqlProductMapper } from "../../adapters/repositories/mappers/SqlProductMapper";
import { DataBuilders } from "../../core/_test_/tools/DataBuilders";
import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";

const app = express();
const { sign } = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

describe("E2E - Sale", () => {
  let saleRepository: SqlSaleRepository;
  let productRepository: SqlProductRepository;
  let userRepository: SqlUserRepository;
  let authorization;

  const product = DataBuilders.generateProduct({
    id: "product_id",
    price: 100,
  });

  const sale = DataBuilders.generateSale({
    productInfos: [
      {
        quantity: 1,
        productId: product.props.id,
      },
    ],
  });

  const user = DataBuilders.generateUser();

  beforeAll(async () => {
    app.use(express.json());
    app.use("/sales", saleRouter);

    const saleMapper = new SqlSaleMapper();
    const productMapper = new SqlProductMapper();
    const userMapper = new SqlUserMapper();
    saleRepository = new SqlSaleRepository(dbTest, saleMapper);
    productRepository = new SqlProductRepository(dbTest, productMapper);
    userRepository = new SqlUserRepository(dbTest, userMapper);
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE sales`);
    await dbTest.raw(`TRUNCATE TABLE products`);
    await dbTest.raw(`TRUNCATE TABLE product_infos`);
    await dbTest.raw(`TRUNCATE TABLE users`);
  });

  it("POST /sales/create", async () => {
    await saleRepository.save(sale);
    await userRepository.save(user);
    await productRepository.save(product);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/sales/create")
      .set("authorization", authorization)
      .send({
        productInfos: sale.props.productInfos,
      });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.productInfos).toEqual(sale.props.productInfos);
    expect(responseBody.totalPrice).toEqual(
      product.props.price * sale.props.productInfos[0].quantity
    );
    expect(responseBody.saleDate).toBeDefined();
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /sales/create should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/sales/create")
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("GET /sales/:id", async () => {
    await saleRepository.save(sale);
    await userRepository.save(user);
    await productRepository.save(product);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/sales/${sale.props.id}`)
      .set("authorization", authorization);
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.productInfos).toEqual(sale.props.productInfos);
    expect(responseBody.totalPrice).toEqual(
      product.props.price * sale.props.productInfos[0].quantity
    );
    expect(responseBody.saleDate).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("GET /sales/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/sales/${sale.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("PATCH /sales/:id", async () => {
    await saleRepository.save(sale);
    await userRepository.save(user);
    await productRepository.save(product);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .patch(`/sales/${sale.props.id}`)
      .set("authorization", authorization)
      .send({
        id: sale.props.id,
        newTotalPrice: sale.props.totalPrice,
      });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.productInfos).toEqual(sale.props.productInfos);
    expect(responseBody.totalPrice).toEqual(
      product.props.price * sale.props.productInfos[0].quantity
    );
    expect(responseBody.saleDate).toBeDefined();
    expect(responseBody.updatedAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("PATCH /sales/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .patch(`/sales/${sale.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("DELETE /sales/:id", async () => {
    await saleRepository.save(sale);
    await userRepository.save(user);
    await productRepository.save(product);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/sales/${sale.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(202);
  });

  it("DELETE /sales/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/sales/${sale.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
  });
});
