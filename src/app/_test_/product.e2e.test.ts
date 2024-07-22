import express from "express";
import supertest from "supertest";

import { SqlProductRepository } from "../../adapters/repositories/SQL/SqlProductRepository";
import { productRouter } from "../routes/product";
import { SqlProductMapper } from "../../adapters/repositories/mappers/SqlProductMapper";
import { DataBuilders } from "../../core/_test_/tools/DataBuilders";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";

const app = express();
const { sign } = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

describe("E2E - Product", () => {
  let productRepository: SqlProductRepository;
  let userRepository: SqlUserRepository;
  let authorization;

  const user = DataBuilders.generateUser();
  const product = DataBuilders.generateProduct();

  beforeAll(async () => {
    app.use(express.json());
    app.use("/products", productRouter);

    const productMapper = new SqlProductMapper();
    const userMapper = new SqlUserMapper();
    productRepository = new SqlProductRepository(dbTest, productMapper);
    userRepository = new SqlUserRepository(dbTest, userMapper);
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE products`);
    await dbTest.raw(`TRUNCATE TABLE users`);

  });

  // it("POST /products/create", async () => {
  //   await userRepository.save(user);
  //   await productRepository.save(product);

  //   authorization = sign(
  //     {
  //       id: user.props.id,
  //       email: user.props.email,
  //     },
  //     jwtSecret
  //   );

  //   const response = await supertest(app)
  //     .post("/products/create")
  //     .set("authorization", authorization)
  //     .send({
  //       name: product.props.name,
  //       productType: product.props.productType,
  //       price: product.props.price,
  //       size: product.props.size,
  //     });
  //   const responseBody = response.body;
  //   console.log(response);
  //   expect(responseBody.id).toBeDefined();
  //   expect(responseBody.name).toEqual(product.props.name);
  //   expect(responseBody.productType).toEqual(product.props.productType);
  //   expect(responseBody.price).toEqual(product.props.price);
  //   expect(responseBody.size).toEqual(product.props.size);
  //   expect(responseBody.createdAt).toBeDefined();
  //   expect(response.status).toBe(201);
  //   jest.setTimeout(1000);
  // });

  // it("Should throw an error with status 400", async () => {
  //   const response = await request(app).post("/products");
  //   expect(response.status).toBe(400);
  //   jest.setTimeout(1000);
  // });

  //   it("Should return a status 200 /products/:id", async () => {
  //     const product = DataBuilders.generateProduct({});

  //     await productRepository.save(product);

  //     await request(app)
  //       .get(`/products/${product.props.id}`)
  //       .expect((response: any) => {
  //         const responseBody = response.body;
  //         console.log(responseBody)
  //         expect(responseBody.id).toBeDefined();
  //         expect(responseBody.name).toEqual(product.props.name);
  //         expect(responseBody.productType).toEqual(product.props.productType);
  //         expect(responseBody.price).toEqual(product.props.price);
  //         expect(responseBody.size).toEqual(product.props.size);
  //         expect(responseBody.createdAt).toBeDefined();
  //       })
  //       .expect(200);
  //     jest.setTimeout(1000);
  //   });
});
