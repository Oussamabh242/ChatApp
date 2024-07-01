import express from "express";
import { refresh, login, singup, verifyEamil } from "../controllers/user.controller";
import { auth } from "../middleware/auth";

export const userRouter = express.Router() ; 

userRouter.post("/" , singup ) ; 
userRouter.put("/activate/:uid" , verifyEamil) ; 
userRouter.post("/auth" , login ) ;
userRouter.get("/" ,refresh) ; 
userRouter.get("/me" ,  auth, (req , res)=>{
    res.send(res.locals.user)  ;
})
