import { SendEmailPayload } from "../valuesObject.ts/SendEmailPayload";

export interface EmailGateway {
  sendEmail(sendEmailPayload: SendEmailPayload): Promise<void>;
}
