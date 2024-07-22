require("dotenv").config();
import jwt from "jsonwebtoken";
import { Request } from "express";
const jwtSecret = process.env.JWT_SECRET;

type DecodedToken = {
  id: string;
  email: string;
};

export interface RequestAuth extends Request {
  user: DecodedToken;
}

export const Auth = (req: any, res: any, next: any) => {
  try {
    const decodedJwt = jwt.verify(
      req.headers.authorization as string,
      jwtSecret as string
    ) as any;
    req.user = {
      id: decodedJwt.id,
      email: decodedJwt.email,
    };
    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
