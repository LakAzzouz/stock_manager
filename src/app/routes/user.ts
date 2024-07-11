import express from "express";
import { CreateUser } from "../../core/usecases/User/CreateUser";
import { InMemoryUserRepository } from "../../core/adapters/repositories/InMemoryUserRepository";
import { User } from "../../core/entities/User";
import { MockPasswordGateway } from "../../core/adapters/gateways/MockPasswordGateway";
import { NodeMailerGateway } from "../../adapters/gateways/NodeMailerGateway";

export const userRouter = express.Router();

const userDb = new Map<string, User>();

const userRepository = new InMemoryUserRepository(userDb);
const passwordGateway = new MockPasswordGateway();
const emailGateway = new NodeMailerGateway();

const createUser = new CreateUser(userRepository, passwordGateway, emailGateway);

userRouter.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    const result = await createUser.execute({
      email,
      password,
      username,
    });

    return res.status(201).send(result)
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
     return res.status(400).send(error.message);
    }
  }
});
