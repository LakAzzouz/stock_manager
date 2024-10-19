import express from "express";
import supertest from "supertest";

import { MediaRepository } from "../../core/repositories/MediaRepository";
import { mediaRouteur } from "../routes/media";
import { SqlMediaRepository } from "../../adapters/repositories/SQL/SqlMediaRepository";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlMediaMapper } from "../../adapters/repositories/mappers/SqlMediaMapper";
import { DataBuilders } from "../../core/_test_/tools/DataBuilders";
import { ProductRepository } from "../../core/repositories/ProductRepository";
import { SqlProductRepository } from "../../adapters/repositories/SQL/SqlProductRepository";
import { SqlProductMapper } from "../../adapters/repositories/mappers/SqlProductMapper";

const app = express();
const { sign } = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

describe("E2E - media", () => {
  let mediaRepository: MediaRepository;
  let productRepository: ProductRepository;
  let authorization;

  const user = DataBuilders.generateUser();
  const product = DataBuilders.generateProduct();
  const media = DataBuilders.generateMedia();

  beforeAll(async () => {
    app.use(express.json());
    app.use("/medias", mediaRouteur);

    const mediaMapper = new SqlMediaMapper();
    const productMapper = new SqlProductMapper();
    mediaRepository = new SqlMediaRepository(dbTest, mediaMapper);
    productRepository = new SqlProductRepository(dbTest, productMapper);
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE medias`);
  });

  it("POST /medias/upload", async () => {
    await productRepository.save(product);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post(`/medias/upload/${media.props.entityType}/${media.props.entityId}`)
      .set("authorization", authorization)
      .send({
        url: media.props.url,
        description: "Example image",
      });

    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.entityId).toBeDefined();
    expect(responseBody.entityType).toBeDefined();
    expect(responseBody.url).toBeDefined();
    expect(responseBody.mimeType).toBeDefined();
    expect(responseBody.file).toBeDefined();
    expect(responseBody.fileName).toBeDefined();
    expect(response.status).toBe(201);
  });
});
