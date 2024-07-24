import express from "express";
import supertest from "supertest";

import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { userRouter } from "../routes/user";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { DataBuilders } from "../../core/_test_/tools/DataBuilders";

const app = express();
const { sign } = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET

describe("E2E - User", () => {
  let userRepository: SqlUserRepository;
  let authorization

  const user = DataBuilders.generateUser();

  beforeAll(async () => {
    app.use(express.json());
    app.use("/users", userRouter);

    const userMapper = new SqlUserMapper();
    userRepository = new SqlUserRepository(dbTest, userMapper);
  });

  afterEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE users`);
  });

  it("POST /users/create", async () => {
    const response = await supertest(app)
    .post("/users/create")
    .send({
      email: user.props.email,
      password: user.props.password,
      username: user.props.username,
    });
    
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.username).toEqual(user.props.username);
    expect(responseBody.email).toEqual(user.props.email);
    expect(responseBody.password).toBeFalsy();
    expect(responseBody.birthDate).toBeDefined();
    expect(responseBody.isVerified).toBeFalsy();
    expect(responseBody.resetPasswordCode).toBeFalsy();
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /users/create should return a status 400", async () => {
    const response = await supertest(app).post("/users/create");
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("POST /users/send_email/:id", async () => {
    await userRepository.save(user);

    const response = await supertest(app)
      .post(`/users/send_email/${user.props.id}`)
      .send({
        id: user.props.id,
        email: user.props.email,
        username: user.props.username,
      });
    const responseBody = response.body;
    expect(responseBody.msg).toEqual(
      `A verification code has been sent to ${user.props.username} via email`
    );
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /users return a status 400", async () => {
    const response = await supertest(app).post(
      `/users/send_email/${user.props.id}`
    );
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("POST users/verify", async () => {
    await userRepository.save(user);

    const response = await supertest(app).post("/users/verify").send({
      email: user.props.email,
      code: user.props.verifyEmailCode,
    });
    expect(response.status).toBe(201);
  });

  it("POST users/verify return a status 400", async () => {
    const response = await supertest(app).post("/users/verify");
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("POST /users/sign_in", async () => {
    const user = DataBuilders.generateUser({
      email: "toto@gmail.com",
      password: "Toto1234!",
      isVerified: true,
    });

    await userRepository.save(user);

    const response = await supertest(app).post("/users/sign_in").send({
      email: user.props.email,
      password: user.props.password,
    });
    const responseBody = response.body
    expect(responseBody.id).toBeDefined();
    expect(responseBody.username).toEqual(user.props.username);
    expect(responseBody.email).toEqual(user.props.email);
    expect(responseBody.birthDate).toBeDefined();
    expect(responseBody.createdAt).toBeDefined();
    expect(responseBody.token).toBeDefined()
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /users/sign_in return a status 400", async () => {
    const response = await supertest(app).post("/users/sign_in");
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("POST /users/reset_password_code", async () => {
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/users/reset_password_code")
      .set("authorization", authorization)
      .send({
        email: user.props.email,
        username: user.props.username,
        resetPasswordCode: user.props.resetPasswordCode,
      });
    const responseBody = response.body;
    expect(responseBody.msg).toEqual(
      `A reset code has been sent to ${user.props.username} via email`
    );
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /users/reset_password_code return a status 400", async () => {
    authorization = sign(
      {
        id: "",
        email: "",
      },
      jwtSecret
    );

    const response = await supertest(app).post("/users/reset_password_code")
    .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("POST /users/verify_reset_code", async () => {
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .post("/users/verify_reset_code")
      .set("authorization", authorization)
      .send({
        email: user.props.email,
        code: user.props.verifyEmailCode,
        password: user.props.password,
      });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.username).toEqual(user.props.username);
    expect(responseBody.email).toEqual(user.props.email);
    expect(responseBody.birthDate).toBeDefined();
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(201);
    jest.setTimeout(1000);
  });

  it("POST /users/verify_reset_code return a status 400", async () => {
    authorization = sign(
      {
        id: "",
        email: "",
      },
      jwtSecret
    );
    const response = await supertest(app).post("/users/verify_reset_code")
    .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("GET /users/", async () => {
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app).get("/users/")
    .set("authorization", authorization)
    .send({
      id: user.props.id,
    });
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody.username).toEqual(user.props.username);
    expect(responseBody.email).toEqual(user.props.email);
    expect(responseBody.birthDate).toBeDefined();
    expect(responseBody.createdAt).toBeDefined();
    expect(response.status).toBe(200);
    jest.setTimeout(1000);
  });

  it("GET /users/:id return a status 400", async () => {
    authorization = sign(
      {
        id: "",
        email: "",
      },
      jwtSecret
    );
    const response = await supertest(app).get("/users/")
    .set("authorization", authorization);
    expect(response.status).toBe(400);
    jest.setTimeout(1000);
  });

  it("DELETE /users/:id", async () => {
    await userRepository.save(user);

    authorization = sign(
      {
        id: user.props.id,
        email: user.props.email,
      },
      jwtSecret
    );

    const response = await supertest(app)
      .delete("/users/delete")
      .set("authorization", authorization)
      .send({
        id: user.props.id,
      });
    const responseStatus = response.status;
    expect(responseStatus).toBe(200);
    jest.setTimeout(1000);
  });

  it("DELETE /users/:id return a status 400", async () => {
    authorization = sign(
      {
        id: "",
        email: "",
      },
      jwtSecret
    );
    const response = await supertest(app).delete("/users/delete")
    .set("authorization", authorization);
    const responseStatus = response.status;
    expect(responseStatus).toBe(400);
  });

  it("Should return a status 401", async () => {
    const response = await supertest(app).delete(`/users/${user.props.id}`)
    expect(response.status).toBe(401)
  })
});
