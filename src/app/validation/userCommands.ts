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

export const userSendEmailSchema = z.object({
  email: z.string(),
  username: z.string(),
});

type UserSendEmailSchema = z.infer<typeof userSendEmailSchema>;

export class UserSendEmailCommand {
  static validateUserSendEmail(body: any): UserSendEmailSchema {
    const validation = userSendEmailSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const userResetPasswordCodeSchema = z.object({
  email: z.string(),
  username: z.string(),
});

type UserResetPasswordCodeSchema = z.infer<typeof userResetPasswordCodeSchema>;

export class UserResetPasswordCodeCommand {
  static validateUserResetPasswordCode(body: any): UserResetPasswordCodeSchema {
    const validation = userResetPasswordCodeSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const userVerifyResetCodeSchema = z.object({
  email: z.string(),
  password: z.string(),
  code: z.string(),
});

type UserVerifyResetCodeSchema = z.infer<typeof userVerifyResetCodeSchema>;

export class UseVerifyResetCodeCommand {
  static validateVerifyResetPasswordCode(body: any): UserVerifyResetCodeSchema {
    const validation = userVerifyResetCodeSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
