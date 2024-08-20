import express from "express";
import supertest from "supertest";

import { MediaRepository } from "../../core/repositories/MediaRepository";
import { mediaRouteur } from "../routes/media";
import { SqlMediaRepository } from "../../adapters/repositories/SQL/SqlMediaRepository";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlMediaMapper } from "../../adapters/repositories/mappers/SqlMediaMapper";

const app = express();

describe("E2E - media", () => {
  let mediaRepository: MediaRepository;
  let authorization;

  beforeAll(async () => {
    app.use(express.json());
    app.use("/medias", mediaRouteur);
    
    const mediaMapper = new SqlMediaMapper()
    mediaRepository = new SqlMediaRepository(dbTest, mediaMapper)
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE medias`);
  });

});