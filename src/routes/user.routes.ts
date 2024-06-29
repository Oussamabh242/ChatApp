import express from "express";
import { refresh, login, singup, verifyEamil } from "../controllers/user.controller";
import { auth } from "../middleware/auth";

export const router = express.Router() ; 

router.post("/" , singup ) ; 
router.put("/activate/:uid" , verifyEamil) ; 
router.post("/auth" , login ) ;
router.get("/" ,refresh) ; 
router.get("/me" ,  auth, (req , res)=>{
    res.send(res.locals.user)  ;
})
