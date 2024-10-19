import express from "express";
import supertest from "supertest";

import { SqlStoreRepository } from "../../adapters/repositories/SQL/SqlStoreRepository";
import { DataBuilders } from "../../core/_test_/tools/DataBuilders";
import { storeRouter } from "../routes/store";
import { SqlStoreMapper } from "../../adapters/repositories/mappers/SqlStoreMapper";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";

const app = express();
const { sign } = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

describe("E2E - Store", () => {
  let storeRepository: SqlStoreRepository;
  let userRepository: SqlUserRepository;
  let authorization;

  const user = DataBuilders.generateUser();
  const store = DataBuilders.generateStore();

  beforeAll(async () => {
    app.use(express.json());
    app.use("/stores", storeRouter);

    const storeMapper = new SqlStoreMapper();
    const userMapper = new SqlUserMapper();
    storeRepository = new SqlStoreRepository(dbTest, storeMapper);
    userRepository = new SqlUserRepository(dbTest, userMapper);
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE stores`);
    await dbTest.raw(`TRUNCATE TABLE users`);
  });

  it("POST /stores/create", async () => {
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/stores/create")
      .set("authorization", authorization)
      .send({
        name: store.props.name,
        city: store.props.city,
        turnover: store.props.turnover,
        frequentation: store.props.frequentation,
      });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.name).toEqual(store.props.name);
    expect(responseBody.city).toEqual(store.props.city);
    expect(responseBody.turnover).toEqual(store.props.turnover);
    expect(responseBody.frequentation).toEqual(store.props.frequentation);
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /stores/create should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );
    const response = await supertest(app)
      .post("/stores/create")
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("GET /stores/:id", async () => {
    await userRepository.save(user);
    await storeRepository.save(store);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/stores/${store.props.id}`)
      .set("authorization", authorization);
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.name).toEqual(store.props.name);
    expect(responseBody.city).toEqual(store.props.city);
    expect(responseBody.turnover).toEqual(store.props.turnover);
    expect(responseBody.frequentation).toEqual(store.props.frequentation);
    expect(responseBody.priceReduction).toEqual(store.props.priceReduction);
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("GET /stores/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );
    const response = await supertest(app)
      .get(`/stores/${store.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("GET /stores/by_city/:city", async () => {
    await userRepository.save(user);
    await storeRepository.save(store);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/stores/by_city/${store.props.city}`)
      .set("authorization", authorization);
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.name).toEqual(store.props.name);
    expect(responseBody.city).toEqual(store.props.city);
    expect(responseBody.turnover).toEqual(store.props.turnover);
    expect(responseBody.frequentation).toEqual(store.props.frequentation);
    expect(responseBody.priceReduction).toEqual(store.props.priceReduction);
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("GET /stores/:city should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .get(`/stores/${store.props.city}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("PATCH /stores/:id", async () => {
    await userRepository.save(user);
    await storeRepository.save(store);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .patch(`/stores/${store.props.id}`)
      .set("authorization", authorization)
      .send({
        id: store.props.id,
        newPriceReduction: store.props.priceReduction,
      });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.name).toEqual(store.props.name);
    expect(responseBody.city).toEqual(store.props.city);
    expect(responseBody.turnover).toEqual(store.props.turnover);
    expect(responseBody.frequentation).toEqual(store.props.frequentation);
    expect(responseBody.priceReduction).toEqual(store.props.priceReduction);
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("PATCH /stores/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .patch(`/stores/${store.props.id}`)
      .set("authorization", authorization)
      .send({
        id: store.props.id,
        newPriceReduction: store.props.priceReduction,
      });
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("DELETE /stores/:id", async () => {
    await userRepository.save(user);
    await storeRepository.save(store);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/stores/${store.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(202);
    jest.setTimeout(1000);
  });

  it("DELETE /stores/:id should return a status 400", async () => {
    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete(`/stores/${store.props.id}`)
      .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });
});
