import express from "express";
import supertest from "supertest";

import { SqlWarehouseRepository } from "../../adapters/repositories/SQL/SqlWarehouseRepository";
import { SqlProductRepository } from "../../adapters/repositories/SQL/SqlProductRepository";
import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { warehouseRouter } from "../routes/warehouse";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlWarehouseMapper } from "../../adapters/repositories/mappers/SqlWarehouseMapper";
import { SqlProductMapper } from "../../adapters/repositories/mappers/SqlProductMapper";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";
import { DataBuilders } from "../../core/_test_/tools/DataBuilders";

const app = express();
const { sign } = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

describe("E2E - Warehouse", () => {
  let warehouseRepository: SqlWarehouseRepository;
  let productRepository: SqlProductRepository;
  let userRepository: SqlUserRepository;
  let authorization;

  const user = DataBuilders.generateUser();
  const warehouse = DataBuilders.generateWarehouse({});
  const product = DataBuilders.generateProduct();

  beforeAll(async () => {
    app.use(express.json());
    app.use("/warehouses", warehouseRouter);

    const warehouseMapper = new SqlWarehouseMapper();
    const productMapper = new SqlProductMapper();
    const userMapper = new SqlUserMapper();

    warehouseRepository = new SqlWarehouseRepository(dbTest, warehouseMapper);
    productRepository = new SqlProductRepository(dbTest, productMapper);
    userRepository = new SqlUserRepository(dbTest, userMapper);
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE warehouses`);
    await dbTest.raw(`TRUNCATE TABLE products`);
    await dbTest.raw(`TRUNCATE TABLE product_infos`);
    await dbTest.raw(`TRUNCATE TABLE users`);
  });

  it("POST /warehouses/create", async () => {
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/warehouses/create")
      .set("authorization", authorization)
      .send({
        city: warehouse.props.city,
        numberOfEmployees: warehouse.props.numberOfEmployees,
      });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.city).toEqual(warehouse.props.city);
    expect(responseBody.managerId).toBeDefined();
    expect(responseBody.numberOfEmployees).toEqual(
      warehouse.props.numberOfEmployees
    );
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /warehouses/create should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/warehouses/create")
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("GET /warehouses/:id", async () => {
    await userRepository.save(user);
    await productRepository.save(product);
    await warehouseRepository.save(warehouse);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/warehouses/${warehouse.props.id}`)
      .set("authorization", authorization);
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.city).toEqual(warehouse.props.city);
    expect(responseBody.managerId).toBeDefined();
    expect(responseBody.numberOfEmployees).toEqual(
      warehouse.props.numberOfEmployees
    );
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("GET /warehouses/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/warehouses/${warehouse.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("GET /warehouses/by_manager_id/:by_managerId", async () => {
    await userRepository.save(user);
    await productRepository.save(product);
    await warehouseRepository.save(warehouse);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/warehouses/by_manager_id/${warehouse.props.managerId}`)
      .set("authorization", authorization);
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.city).toEqual(warehouse.props.city);
    expect(responseBody.managerId).toBeDefined();
    expect(responseBody.numberOfEmployees).toEqual(warehouse.props.numberOfEmployees);
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("GET /warehouses/:managerId should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/warehouses/${warehouse.props.managerId}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("PATCH /warehouses/:id", async () => {
    await userRepository.save(user);
    await productRepository.save(product);
    await warehouseRepository.save(warehouse);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .patch(`/warehouses/${warehouse.props.id}`)
      .set("authorization", authorization)
      .send({
        id: warehouse.props.id,
        newNumberOfEmployees: warehouse.props.numberOfEmployees,
      });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.city).toEqual(warehouse.props.city);
    expect(responseBody.managerId).toBeDefined();
    expect(responseBody.numberOfEmployees).toEqual(
      warehouse.props.numberOfEmployees
    );
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("PATCH /warehouses/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .patch(`/warehouses/${warehouse.props.id}`)
      .set("authorization", authorization)
      .send({
        id: warehouse.props.id,
        newNumberOfEmployees: warehouse.props.numberOfEmployees,
      });
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("DELETE /warehouses/:id", async () => {
    await userRepository.save(user);
    await productRepository.save(product);
    await warehouseRepository.save(warehouse);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/warehouses/${warehouse.props.id}`)
      .set("authorization", authorization)
      .send({
        id: warehouse.props.id,
      });
    expect(response.status).toBe(202);
    jest.setTimeout(1000);
  });

  it("DELETE /warehouses/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/warehouses/${warehouse.props.id}`)
      .set("authorization", authorization)
      .send({
        id: warehouse.props.id,
      });
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });
});
