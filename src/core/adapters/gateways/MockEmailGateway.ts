import { EmailGateway } from "../../gateways/EmailGateway";

export class MockEmailGateway implements EmailGateway {
  async sendEmail(_email: string, _message: string, _username: string): Promise<void> {
    return;
  }
}
