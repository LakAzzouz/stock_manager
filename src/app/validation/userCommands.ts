import { z } from "zod";

export const userCreateSchema = z.object({
  email: z.string(),
  password: z.string(),
  username: z.string(),
});

type UserCreateSchema = z.infer<typeof userCreateSchema>;

export class UserCreateCommand {
  static validateUserCreate(body: any): UserCreateSchema {
    const validation = userCreateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const userSignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type UserSignInSchema = z.infer<typeof userSignInSchema>;

export class UserSignInCommand {
  static validateUserSignIn(body: any): UserSignInSchema {
    const validation = userSignInSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const userVerifySchema = z.object({
  email: z.string(),
  code: z.string(),
});

type UserVerifySchema = z.infer<typeof userVerifySchema>;

export class UserVerifyCommand {
  static validateUserVerify(body: any): UserVerifySchema {
    const validation = userVerifySchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
