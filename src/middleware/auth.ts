import { Request ,Response } from "express"
import jwt from "jsonwebtoken" ; 
import { genToken } from "../utils/security";

const JWT_KEY  = process.env.JWT_SECRET_KEY ; 
export const auth = async (req:Request , res : Response , next :any)=>{
    const accessToken = req.headers['authorization'];
    const refreshToken = req.cookies["refreshToken"];
    if (accessToken === undefined && refreshToken===undefined) {
        return res.status(401).send('Access Denied. No token provided.');
    }
    try {
        if(accessToken){
            const decoded :any= await jwt.decode(accessToken) ; 
            if(decoded && (Date.now()< decoded.exp*1000)){
                res.locals.user = decoded.uid ;
                next();
            }
            else{
                throw new Error("expired") ; 
            }
        }
    } catch (error) {
        if (!refreshToken) {
          return res.status(401).send('Access Denied. No refresh token provided.');
        }
    
        try {
          const decoded : any = await jwt.decode(refreshToken as string);
          if(decoded){   
            const accessToken = await genToken({uid : decoded.uid});
        
            res
                .header('refreshToken', refreshToken)
                .header('Authorization', accessToken)
                .locals.user = decoded.uid;
            next() ; 
            }
        } 
        catch (error) {
            return res.status(400).send('Invalid Token.');
        }
        
    }
}