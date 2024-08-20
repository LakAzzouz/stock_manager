import express from "express";
import supertest from "supertest";

import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlProductRepository } from "../../adapters/repositories/SQL/SqlProductRepository";
import { SqlStockRepository } from "../../adapters/repositories/SQL/SqlStockRepository";
import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { SqlProductMapper } from "../../adapters/repositories/mappers/SqlProductMapper";
import { SqlStockMapper } from "../../adapters/repositories/mappers/SqlStockMapper";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";
import { DataBuilders } from "../../core/_test_/tools/DataBuilders";
import { stockRouter } from "../routes/stock";

const app = express();
const { sign } = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

describe("E2E - stock", () => {
  let stockRepository: SqlStockRepository;
  let productRepository: SqlProductRepository;
  let userRepository: SqlUserRepository;
  let authorization;

  const stock = DataBuilders.generateStock();
  const product = DataBuilders.generateProduct();
  const user = DataBuilders.generateUser();

  beforeAll(async () => {
    app.use(express.json());
    app.use("/stocks", stockRouter);

    const stockMapper = new SqlStockMapper();
    const productMapper = new SqlProductMapper();
    const userMapper = new SqlUserMapper();

    stockRepository = new SqlStockRepository(dbTest, stockMapper);
    productRepository = new SqlProductRepository(dbTest, productMapper);
    userRepository = new SqlUserRepository(dbTest, userMapper);
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE stocks`);
    await dbTest.raw(`TRUNCATE TABLE products`);
    await dbTest.raw(`TRUNCATE TABLE users`);
    await dbTest.raw(`TRUNCATE TABLE stock_datas`);
  });

  it("POST /stocks/initiate", async () => {
    await stockRepository.save(stock);
    await productRepository.save(product);
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/stocks/initiate")
      .set("authorization", authorization)
      .send({
        locationId: stock.props.locationId,
        stockDatas: stock.props.stockDatas,
        type: stock.props.type,
      });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.locationId).toBeDefined();
    expect(responseBody.type).toEqual(stock.props.type);
    expect(responseBody.stockDatas).toEqual(stock.props.stockDatas);
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /stocks/initiate should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/stocks/initiate")
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("POST /stocks/create", async () => {
    await stockRepository.save(stock);
    await productRepository.save(product);
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/stocks/create")
      .set("authorization", authorization)
      .send({
        productId: product.props.id,
      });
    const responseBody = response.body;
    expect(responseBody.productId).toEqual(product.props.id);
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /stocks/create should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/stocks/create")
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("GET /stocks/:id", async () => {
    await stockRepository.save(stock);
    await productRepository.save(product);
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/stocks/${stock.props.id}`)
      .set("authorization", authorization);
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.productId).toBeDefined();
    expect(responseBody.stockByLocation).toBeDefined();
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("GET /stocks/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/stocks/${stock.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("DELETE /stocks/:id", async () => {
    await stockRepository.save(stock);
    await productRepository.save(product);
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/stocks/${stock.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(202);
    jest.setTimeout(1000);
  });

  it("DELETE /stocks/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/stocks/${stock.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
  });
});
