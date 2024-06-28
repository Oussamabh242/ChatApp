import express from "express";
import { allusers } from "../controllers/user.controller";

export const router = express.Router() ; 

router.get("/all" , allusers ) ; 