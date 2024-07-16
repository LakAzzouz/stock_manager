export interface PasswordGateway {
  hashPassword(password: string): string;
  compare(password: string, hashedPassword: string): boolean;
  //sendEmail(email: string, message: string, username: string): void
}
