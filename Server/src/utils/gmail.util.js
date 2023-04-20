import nodemailer from "nodemailer";
import {
  emailService,
  emailUser,
  passEmail,
  portEmailService,
} from "../config/email.config.js";

const transport = nodemailer.createTransport({
  service: emailService,
  port: portEmailService,
  auth: { user: emailUser, pass: passEmail },
});

export default transport;
