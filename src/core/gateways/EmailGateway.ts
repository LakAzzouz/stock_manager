export interface EmailGateway {
  sendEmail(email: string, message: string, username: string): Promise<void>;
}
