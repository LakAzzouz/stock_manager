import express from "express";
const jwt = require("jsonwebtoken");

import { CreateUser } from "../../core/usecases/User/CreateUser";
import { MockPasswordGateway } from "../../core/adapters/gateways/MockPasswordGateway";
import { NodeMailerGateway } from "../../adapters/gateways/NodeMailerGateway";
import { VerifyEmail } from "../../core/usecases/User/VerifyEmail";
import { SignIn } from "../../core/usecases/User/SignIn";
import { UseVerifyResetCodeCommand, UserCreateCommand, UserResetPasswordCodeCommand, UserSendEmailCommand, UserSignInCommand, UserVerifyCommand } from "../validation/userCommands";
import { GetUserById } from "../../core/usecases/User/GetUserById";
import { DeleteUser } from "../../core/usecases/User/DeleteUser";
import { SqlUserRepository } from "../../adapters/repositories/SQL/SqlUserRepository";
import { SqlUserMapper } from "../../adapters/repositories/mappers/SqlUserMapper";
import { SendEmail } from "../../core/usecases/User/SendEmail";
import { GenerateResetPasswordCode } from "../../core/usecases/User/GenerateResetPasswordCode";
import { VerifyResetPasswordCode } from "../../core/usecases/User/VerifyResetPasswordCode";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { Auth, RequestAuth } from "../../adapters/middlewares/auth";

export const userRouter = express.Router();

const sqlUserMapper = new SqlUserMapper();
const sqlUserRepository = new SqlUserRepository(dbTest, sqlUserMapper);

const passwordGateway = new MockPasswordGateway();
const emailGateway = new NodeMailerGateway();

const createUser = new CreateUser(sqlUserRepository, passwordGateway);
const sendEmail = new SendEmail(sqlUserRepository, emailGateway);
const signIn = new SignIn(sqlUserRepository, passwordGateway);
const verifyEmail = new VerifyEmail(sqlUserRepository);
const resetPassword = new GenerateResetPasswordCode(sqlUserRepository, emailGateway);
const verifyResetCode = new VerifyResetPasswordCode(sqlUserRepository);
const getUserById = new GetUserById(sqlUserRepository);
const deleteUser = new DeleteUser(sqlUserRepository);

const jwtSecret = process.env.JWT_SECRET

userRouter.post("/create", async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = UserCreateCommand.validateUserCreate(req.body);

    const user = await createUser.execute({
      email,
      password,
      username,
    });

    const result = {
      id: user.props.id,
      username: user.props.username,
      email: user.props.email,
      birthDate: user.props.birthDate,
      createdAt: user.props.createdAt,
    };

    return res.status(201).send(result);
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

userRouter.post("/send_email/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;
      const { email, username } = UserSendEmailCommand.validateUserSendEmail(req.body);

      await sendEmail.execute({
        id,
        email,
        username,
      });

      const result = {
        msg: `A verification code has been sent to ${username} via email`,
      };

      return res.status(201).send(result);
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

userRouter.post("/verify", async (req: express.Request, res: express.Response) => {
    try {
      const { email, code } = UserVerifyCommand.validateUserVerify(req.body);

      await verifyEmail.execute({
        email,
        code,
      });

      return res.sendStatus(201);
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

userRouter.post("/sign_in", async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = UserSignInCommand.validateUserSignIn(req.body);

      const user = await signIn.execute({
        email,
        password,
      });

      const token = jwt.sign({ id: user.props.id, email: user.props.email }, jwtSecret)

      const result = {
        id: user.props.id,
        username: user.props.username,
        email: user.props.email,
        birthDate: user.props.birthDate,
        createdAt: user.props.createdAt,
        token
      };

      return res.status(201).send(result);
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

userRouter.use(Auth);
userRouter.post("/reset_password_code", async (req: express.Request, res: express.Response) => {
    try {
      const { email, username } = UserResetPasswordCodeCommand.validateUserResetPasswordCode(req.body);

      await resetPassword.execute({
        email,
        username,
        resetPasswordCode: "",
      });

      const result = {
        msg: `A reset code has been sent to ${username} via email`,
      };

      return res.status(201).send(result);
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

userRouter.post("/verify_reset_code", async (req: express.Request, res: express.Response) => {
    try {
      const authRequest = req as RequestAuth;
      const id = authRequest.user.id;  
      const { email, password, code } = UseVerifyResetCodeCommand.validateVerifyResetPasswordCode(req.body);

      const user = await verifyResetCode.execute({
        email,
        code,
        password,
      });

      const result = {
        id,
        username: user.props.username,
        email: user.props.email,
        birthDate: user.props.birthDate,
        createdAt: user.props.createdAt,
      };

      return res.status(201).send(result);
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

userRouter.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const authRequest = req as RequestAuth;
    const id = authRequest.user.id;  

    const user = await getUserById.execute({
      id,
    });

    const result = {
      id: user.props.id,
      username: user.props.username,
      email: user.props.email,
      birthDate: user.props.birthDate,
      createdAt: user.props.createdAt,
    };

    return res.status(200).send(result);
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

userRouter.delete("/", async (req: express.Request, res: express.Response) => {
    try {
      const authRequest = req as RequestAuth;
      const id = authRequest.user.id;  

      await deleteUser.execute({
        id,
      });

      return res.sendStatus(200);
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);
