import "dotenv/config";
import nodemailer from "nodemailer";

import { EmailGateway } from "../../core/gateways/EmailGateway";
import { SendEmailPayload } from "../../core/valuesObject.ts/SendEmailPayload";

export class NodeMailerGateway implements EmailGateway {
  async sendEmail(sendEmailPayload: SendEmailPayload): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "lakhdar.azzouz@outlook.fr",
        pass: process.env.MDPMAIL,
      },
    });

    const info = await transporter.sendMail({
      from: '"stock_manager" <lakhdar.azzouz@outlook.fr>', // sender address
      to: sendEmailPayload.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Confirm your e-mail", // plain text body
      html: `<b>Security code ${sendEmailPayload.message}</b>`, // html body
    });

    console.log(info.response);
  }
}
