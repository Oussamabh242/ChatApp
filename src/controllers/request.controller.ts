import { Request , Response } from "express";
import { RequestIn, RequestResponse } from "../schemas/request.schemas";
import { createRequest, getRecivedRequests, getSentRequests, responseReq } from "../services/request.services";

export const sendRequest =async (req : Request , res : Response )=>{
    const data : RequestIn = {
        sender : res.locals.user , 
        reciver : req.body.reciver
    }  ; 
    try{
        const req = await createRequest(data) ; 
        return res.status(200).json({
            msg : "request sent to" , 
            to : req?.recivedId
        }) ; 
    }catch(err){
        return res.status(400).send("failed to send request" ) ; 
    }
}

export async function recivedRequests(req:Request , res: Response) {
    try{
        const uid = res.locals.user ; 
        const recived = await getRecivedRequests(uid) ; 
        return res.send(recived) ; 
    }catch(err){
        return res.send("error while sending recived Requests")
        console.log("" , err) ; 
    }

}

export async function sentRequests(req:Request , res: Response) {
    try{
        const uid = res.locals.user ; 
        const sent = await getSentRequests(uid) ; 
        return res.send(sent) ; 
    }catch(err){
        return res.send("error while sending sent Requests")
        console.log("" , err) ; 
    }
}

export async function respondRequest(req:Request,res : Response) {
    try{
        const data : RequestResponse = {
        userId : res.locals.user , 
        requestId : req.params["reqid"] ,
        response : req.params["response"]==="true"
        } ; 
        const response = await responseReq(data) ; 
        return res.send("request modified") ;
    }catch(err){
        console.log(err) ; 
        return res.send("error while responding fto the request") ;
        
    }
}