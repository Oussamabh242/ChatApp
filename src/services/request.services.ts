import {prisma} from '../utils/_db' ; 
import { RequestIn, RequestResponse } from '../schemas/request.schemas';

export async function createRequest(request:RequestIn) {
    try{
        const requestDb = await prisma.request.create({
        data:{
            recivedId : request.reciver ,
            senderId : request.sender
        }
        }) ; 
        return requestDb ; 
    }catch(err){
        console.error(err); 
    }
} ; 
export async function getRecivedRequests(uid:string) {
    try{
        const recived =await prisma.user.findUnique({
        where :{
            id : uid
        } ,
        select : {
            recived:{
                select :{
                    sender:{
                        select : {
                            fullName : true
                        }
                    } , 
                    date : true
                }
            }
        }
    }) ; 
    return recived ; 
    }
    catch(err){
        console.log("error while finding recived requests") ; 
    }
    
}

export async function getSentRequests(uid:string) {
    try{
        const sent =await prisma.user.findUnique({
            where :{
                id : uid
            } ,
            select : {
                sent : {
                    select : {
                        reciver : {
                            select :{
                                fullName : true
                            }
                        } , 
                        date : true 
                    }
                }
            }
        }) ; 
        return sent ; 
    }catch(err){
        console.log("error while finding sent requests") ; 
    }
}

export async function responseReq(response : RequestResponse) {
    try {
        if(response.response===false){
            const request = await prisma.request.delete({
                where:{
                    id : response.requestId,
                    recivedId : response.userId
                }
            }) ; 
            return request ; 
        }
        else{
            const request = await prisma.request.update({
                where:{
                    id : response.requestId , 
                    recivedId : response.userId
                },
                data : {
                    status : "confirmed"
                }
            }) ; 
            console.log(request) ; 
            return request ;
        }
    }catch(err){
        console.log("error while responding to requests") ; 
    }
}