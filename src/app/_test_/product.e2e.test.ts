// import express from "express";
// import request from "supertest";

// import { SqlProductRepository } from "../../adapters/repositories/SQL/SqlProductRepository";
// import { productRouter } from "../routes/product";
// import { SqlProductMapper } from "../../adapters/repositories/mappers/SqlProductMapper";
// import { DataBuilders } from "../../core/_test_/tools/DataBuilders";
// import { dbTest } from "../../adapters/_test_/tools/dbTest";

// const app = express();
// const product = DataBuilders.generateProduct({});

// describe("E2E - Product", () => {
//   let productRepository: SqlProductRepository;

//   beforeAll(async () => {
//     app.use(express.json());
//     app.use("/products", productRouter);

//     const productMapper = new SqlProductMapper();
//     productRepository = new SqlProductRepository(dbTest, productMapper);
//   });

//   afterEach(async () => {
//     await dbTest.raw(`TRUNCATE TABLE products`);
//   });

//   it("Should return a status 201 /product", async () => {
//     await request(app)
//       .post("/products")
//       .send({
//         name: product.props.name,
//         productType: product.props.productType,
//         price: product.props.price,
//         size: product.props.size,
//       })
//       .expect((response: any) => {
//         const responseBody = response.body;
//         expect(responseBody.id).toBeDefined();
//         expect(responseBody.name).toEqual(product.props.name);
//         expect(responseBody.productType).toEqual(product.props.productType);
//         expect(responseBody.price).toEqual(product.props.price);
//         expect(responseBody.size).toEqual(product.props.size);
//         expect(responseBody.createdAt).toBeDefined();
//       })
//       .expect(201);
//     jest.setTimeout(1000);
//   });

//   it("Should throw an error with status 400", async () => {
//     const response = await request(app).post("/products");
//     expect(response.status).toBe(400);
//     jest.setTimeout(1000);
//   });

//     it("Should return a status 200 /products/:id", async () => {
//       const product = DataBuilders.generateProduct({});

//       await productRepository.save(product);

//       await request(app)
//         .get(`/products/${product.props.id}`)
//         .expect((response: any) => {
//           const responseBody = response.body;
//           console.log(responseBody)
//           expect(responseBody.id).toBeDefined();
//           expect(responseBody.name).toEqual(product.props.name);
//           expect(responseBody.productType).toEqual(product.props.productType);
//           expect(responseBody.price).toEqual(product.props.price);
//           expect(responseBody.size).toEqual(product.props.size);
//           expect(responseBody.createdAt).toBeDefined();
//         })
//         .expect(200);
//       jest.setTimeout(1000);
//     });
// });
