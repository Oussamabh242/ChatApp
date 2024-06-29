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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.login = exports.verifyEamil = exports.singup = void 0;
const user_services_1 = require("../services/user.services");
const _db_1 = require("../utils/_db");
const security_1 = require("../utils/security");
function singup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_services_1.createUser)(req.body);
            return res.status(200).send(user);
        }
        catch (err) {
            res.send("Cannot create user");
        }
        return res.status(100);
    });
}
exports.singup = singup;
function verifyEamil(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uid = req.params["uid"];
            const user = yield _db_1.prisma.user.findUnique({
                where: {
                    id: uid
                }
            });
            if (!user) {
                return res.status(403).send("wrong confiramtion link");
            }
            yield _db_1.prisma.user.update({
                where: {
                    id: uid
                },
                data: {
                    verified: true
                }
            });
            res.send("user verified successfully");
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.verifyEamil = verifyEamil;
;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const v = yield (0, user_services_1.verifyUser)(req.body);
        console.log(v);
        if (v === false)
            return res.status(401).send("wrong credentials");
        const access = yield (0, security_1.genToken)({ uid: v });
        const refresh = yield (0, security_1.genRefToken)({ uid: v });
        return res.header("refreshToken", refresh)
            .header("Authorization", access)
            .send(access);
    });
}
exports.login = login;
function refresh(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.body.token;
        if (!refreshToken) {
            return res.status(401).send('Access Denied. No refresh token provided.');
        }
        try {
            const accessToken = yield (0, security_1.regToken)(refreshToken);
            res
                .header('Authorization', accessToken)
                .send("refresh token regenerated");
        }
        catch (error) {
            return res.status(400).send('Invalid refresh token.');
        }
    });
}
exports.refresh = refresh;
