import { EmailGateway } from "../../gateways/EmailGateway";
import { SendEmailPayload } from "../../valuesObject.ts/SendEmailPayload";

export class MockEmailGateway implements EmailGateway {
  async sendEmail(sendEmailPayload: SendEmailPayload): Promise<void> {
    return;
  }
}
