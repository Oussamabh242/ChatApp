"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.createUser = void 0;
const _db_1 = require("../utils/_db");
const nodemailer_1 = __importDefault(require("nodemailer"));
const security_1 = require("../utils/security");
;
;
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            data.password = yield (0, security_1.hashPassword)(data.password);
            const user = yield _db_1.prisma.user.create({
                data: {
                    fullName: data.fullName,
                    password: data.password,
                    email: data.email
                }
            });
            sendMail(user.email, user.id);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createUser = createUser;
;
function verifyUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const DBuser = yield _db_1.prisma.user.findUnique({
            where: {
                email: user.email
            }
        });
        if (!DBuser) {
            return false;
        }
        else if (!(yield (0, security_1.comparePassword)(user.password, DBuser.password))) {
            return false;
        }
        else {
            return DBuser.id;
        }
    });
}
exports.verifyUser = verifyUser;
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_ADRESS,
        pass: process.env.MAIL_PASSWORD,
    },
});
function sendMail(email, userId) {
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
        else {
            console.log("Email sent: ", info.response);
        }
    });
}
