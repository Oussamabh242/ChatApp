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
exports.regToken = exports.comparePassword = exports.hashPassword = exports.genRefToken = exports.genToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_KEY = process.env.JWT_SECRET_KEY;
function genToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield jsonwebtoken_1.default.sign(payload, JWT_KEY, { expiresIn: '30m' });
        return token;
    });
}
exports.genToken = genToken;
function genRefToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield jsonwebtoken_1.default.sign(payload, JWT_KEY, { expiresIn: '7d' });
        return token;
    });
}
exports.genRefToken = genRefToken;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        const hash = yield bcrypt_1.default.hash(password, saltRounds);
        return hash;
    });
}
exports.hashPassword = hashPassword;
function comparePassword(plain, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plain, hash);
    });
}
exports.comparePassword = comparePassword;
function regToken(refToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = yield jsonwebtoken_1.default.verify(refToken, JWT_KEY);
        const accessToken = genToken({ uid: decoded.uid });
        return accessToken;
    });
}
exports.regToken = regToken;
