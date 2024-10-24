import express from "express";
import {
  listFriends
} from "../controllers/friend.controller";
import { auth } from "../middleware/auth";

export const friendRouter = express.Router();

friendRouter.use(auth);

friendRouter.get("/" ,listFriends)
