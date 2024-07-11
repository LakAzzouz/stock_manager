import "dotenv/config";
import { EmailGateway } from "../../core/gateways/EmailGateway";


import nodemailer from "nodemailer";

export class NodeMailerGateway implements EmailGateway {

  async sendEmail(email: string, message: string, username: string): Promise<void> {
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
      from: '"Maddison Foo Koch 👻" <lakhdar.azzouz@outlook.fr>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world", // plain text body
      html: `<b>Security code ${message}</b>`, // html body
    });

    console.log(info.response)

  }
}
