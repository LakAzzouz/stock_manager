import express from "express";

import { CreateUser } from "../../core/usecases/User/CreateUser";
import { MockPasswordGateway } from "../../core/adapters/gateways/MockPasswordGateway";
import { NodeMailerGateway } from "../../adapters/gateways/NodeMailerGateway";
import { VerifyEmail } from "../../core/usecases/User/VerifyEmail";
import { SignIn } from "../../core/usecases/User/SignIn";
import { UserCreateCommand, UserSignInCommand, UserVerifyCommand } from "../validation/userCommands";
import { GetUserById } from "../../core/usecases/User/GetUserById";
import { DeleteUser } from "../../core/usecases/User/DeleteUser";
import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";
import { SendEmail } from "../../core/usecases/User/SendEmail";
import { InMemoryUserRepository } from "../../core/adapters/repositories/InMemoryUserRepository";
import { User } from "../../core/entities/User";
import { db } from "../../index";
import { ResetPassword } from "../../core/usecases/User/GenerateResetPasswordCode";
import { VerifyResetPasswordCode } from "../../core/usecases/User/VerifyResetPasswordCode";

export const userRouter = express.Router();

const sqlUserMapper = new SqlUserMapper()
const sqlUserRepository = new SqlUserRepository(db, sqlUserMapper);

const userDb = new Map<string, User>();
const userRepository = new InMemoryUserRepository(userDb);

const passwordGateway = new MockPasswordGateway();
const emailGateway = new NodeMailerGateway();

const createUser = new CreateUser(userRepository, passwordGateway);
const sendEmail = new SendEmail(userRepository, emailGateway);
const signIn = new SignIn(userRepository, passwordGateway);
const verifyEmail = new VerifyEmail(userRepository);
const resetPassword = new ResetPassword(userRepository, emailGateway);
const verifyResetCode = new VerifyResetPasswordCode(userRepository);
const getUserById = new GetUserById(userRepository);
const deleteUser = new DeleteUser(userRepository);

userRouter.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = UserCreateCommand.validateUserCreate(req.body);

    const result = await createUser.execute({
      email,
      password,
      username,
    });

    return res.status(201).send(result.props);
  } catch (error: any) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

userRouter.post("/send_email/:id", async (req: express.Request, res: express.Response) => {
try {
  const id = req.params.id;
  const {email, username} = req.body;

  await sendEmail.execute({
    id,
    email,
    username
  });

  const result = `A verification code has been sent to ${username} via email`

  return res.status(201).send(result);
  } catch (error: any) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
})

userRouter.post("/sign_in", async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = UserSignInCommand.validateUserSignIn(req.body);

      const result = await signIn.execute({
        email,
        password,
      });

      return res.status(201).send(result.props);
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

userRouter.post("/verify", async (req: express.Request, res: express.Response) => {
    try {
      const { email, code } = UserVerifyCommand.validateUserVerify(req.body);

      const result = await verifyEmail.execute({
        email,
        code,
      });

      return res.sendStatus(200);
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

userRouter.post("/reset_password_code/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const { email, username } = req.body;

    await resetPassword.execute({
      email,
      id,
      username,
      resetPasswordCode: ""
    })

    const result = `A reset code has been sent to ${username} via email`

    return res.status(201).send(result)
  } catch (error: any) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
}
);

userRouter.post("/verify_reset_code/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const { email, password, code } = req.body;

    const result = await verifyResetCode.execute({
      email,
      code,
      password
    })

    return res.status(201).send(result)
  } catch (error: any) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
}
);

userRouter.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;

    const result = await getUserById.execute({
      id
    });

    return res.status(200).send(result);
  } catch (error: any) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

userRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;

    await deleteUser.execute({
      id
    });

    const result = "USER_DELETED";
    
    return res.status(202).send(result);
  } catch (error: any) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
})
