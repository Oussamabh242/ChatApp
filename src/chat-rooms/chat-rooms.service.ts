import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatRoomsService {
    constructor(private readonly prisma : PrismaService){}
    async createRoom(subs : string[]  , name?:string  ){
        
        const name2 = await this.verifyName(subs , name) ; 
        console.log(name2) ; 
        return await this.prisma.chat.create({
            data : {
                name : name2 
            }
        }) ; 
    } 

    async addUserToChat(subs:string[] , chatId:string ){
        try{
            for(let i = 0 ; i<subs.length ; i++){
                await this.prisma.chatUser.create({
                    data : {
                        chatId : chatId , 
                        userId  : subs[i]
                    }
                });
            }
            return " user(s) added successfully " ; 
        }
        catch {
            return "error happend where adding users to the chat" ; 
        }
        
        
    }
    async verifyName(subs : string[] , name:string |undefined ) : Promise<string>{
        if(name) return name ;
        name = "" ; 
        for(let i = 0; i<2 ; i++){
            const user = await this.prisma.user.findUnique({
                where:{
                    id : subs[i]
                }
            })
            name+= user.fullName.split(" ")[0] + " " ;
        }
        return name
    } ; 

    async getChatInfo(id : string){
        const chat = await this.prisma.chat.findUnique({
            where :{
                id : id , 
            },
            select : {
                name : true , 
                users : {
                    select : {
                        user :{
                            select : {
                                fullName : true 
                            }
                        }
                    }
                } , 
                messages : {
                    select : {
                        text : true , 
                        sender : {
                            select : {
                                fullName : true 
                            }
                        }
                    }
                }
            }
        });
        return chat ; 

    }
}
