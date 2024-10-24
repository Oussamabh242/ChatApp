import { prisma } from "../utils/_db";
import nodemailer from "nodemailer";
import { comparePassword, hashPassword } from "../utils/security";
import { UserInput, UserLogin } from "../schemas/user.schemas";

export async function createUser(data: UserInput) {
  try {
    data.password = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        fullName: data.fullName,
        password: data.password,
        email: data.email,
      },
    });
    sendMail(user.email, user.id);
  } catch (err) {
    console.log(err);
  }
}

export async function verifyUser(user: UserLogin) {
  const DBuser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!DBuser) {
    return false;
  } else if (!(await comparePassword(user.password, DBuser.password))) {
    return false;
  } else {
    return DBuser.id;
  }
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_ADRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

function sendMail(email: string, userId: string) {
  const mailOptions = {
    from: process.env.MAIL_ADRESS,
    to: email,
    subject: "verify your ChatApp email adress",
    text: `click the link below to verify your email adress \n http://${process.env.HOST}/users/activate/${userId} `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    }
  });
}
