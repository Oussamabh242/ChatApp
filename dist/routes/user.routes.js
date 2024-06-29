"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
exports.router = express_1.default.Router();
exports.router.post("/", user_controller_1.singup);
exports.router.put("/activate/:uid", user_controller_1.verifyEamil);
exports.router.post("/auth", user_controller_1.login);
exports.router.get("/", user_controller_1.refresh);
exports.router.get("/me", auth_1.auth, (req, res) => {
    res.send(res.locals.user);
});
