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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const security_1 = require("../utils/security");
const JWT_KEY = process.env.JWT_SECRET_KEY;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers['authorization'];
    const refreshToken = req.headers["x-refreshtoken"];
    if (accessToken === undefined && refreshToken === undefined) {
        return res.status(401).send('Access Denied. No token provided.');
    }
    try {
        if (accessToken) {
            const decoded = yield jsonwebtoken_1.default.decode(accessToken);
            if (decoded && (Date.now() < decoded.exp * 1000)) {
                res.locals.user = decoded.uid;
                next();
            }
            else {
                throw new Error("expired");
            }
        }
    }
    catch (error) {
        if (!refreshToken) {
            return res.status(401).send('Access Denied. No refresh token provided.');
        }
        try {
            const decoded = yield jsonwebtoken_1.default.decode(refreshToken);
            if (decoded) {
                const accessToken = yield (0, security_1.genToken)({ uid: decoded.uid });
                res
                    .header('refreshToken', refreshToken)
                    .header('Authorization', accessToken)
                    .locals.user = decoded.uid;
                next();
            }
        }
        catch (error) {
            return res.status(400).send('Invalid Token.');
        }
    }
});
exports.auth = auth;
