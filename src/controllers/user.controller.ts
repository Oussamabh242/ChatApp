import { Request , Response } from "express";
import { allUsers } from "../services/user.services";


export async function allusers( req : Request ,res:Response){
    const users= await allUsers() ; 
    return res.status(200).send(users) ; 
}