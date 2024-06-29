import { Request , Response } from "express";
import { createUser , UserInput, UserLogin, verifyUser} from "../services/user.services";
import {prisma} from "../utils/_db" ; 
import {genToken , genRefToken, regToken} from "../utils/security"
import jwt from "jsonwebtoken" ;

export async function singup( req : Request<{} , {} , UserInput> ,res:Response){
    try{
        
        const user= await createUser(req.body) ;
        return res.status(200).send(user) ; 
    }
    catch(err){
        res.send("Cannot create user") ; 
    }
    return res.status(100) ; 
}

export async function verifyEamil(req : Request , res: Response) {
    try {
        const uid:string = req.params["uid"] ; 
        const user = await prisma.user.findUnique({
            where :{
                id : uid
            }
        }) ; 
        if(!user){
            return res.status(403).send("wrong confiramtion link") ;
        }
        await prisma.user.update({
            where : {
                id : uid
            },
            data : {
                verified : true
            }
        }) ; 
        res.send("user verified successfully") ; 
    }
    catch(err){
        console.log(err) ;
    }
} ; 

export async function login(req : Request<{} , {} ,UserLogin>, res: Response) {
    const v = await verifyUser(req.body) ; 
    console.log(v) ; 
    if (v===false) return res.status(401).send("wrong credentials") ; 
    
    const access = await genToken({uid : v}) ; 
    const refresh = await genRefToken({uid : v}) ; 
    return res.header("refreshToken", refresh )
        .header("Authorization" ,access)
        .send(access) ; 
    
}

export async function refresh(req :Request, res :Response) {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }
  
    try {
      const accessToken = await regToken(refreshToken) ;
      res
        .header('Authorization', accessToken)
        .send("refresh token regenerated");
    } catch (error) {
      return res.status(400).send('Invalid refresh token.');
    }
  }
