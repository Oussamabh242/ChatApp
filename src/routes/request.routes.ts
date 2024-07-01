import { Router  } from "express";
import { auth } from "../middleware/auth";
import { recivedRequests, respondRequest, sendRequest, sentRequests } from "../controllers/request.controller";

export const requestRouter = Router()

requestRouter.use(auth) ; 

requestRouter.post("/send" ,sendRequest ) ;
requestRouter.get("/recived" ,recivedRequests) ; 
requestRouter.get("/sent" ,sentRequests) ; 
requestRouter.put("/respond/:response/:reqid" ,respondRequest) ; 