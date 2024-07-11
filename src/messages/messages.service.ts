import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private readonly prisma : PrismaService){}

    async sendMessage(textSend :  {chatid: string , text : string }, userId : string){
        try{
            const message= await this.prisma.message.create({
                data : {
                    chatId : textSend.chatid, 
                    senderId : userId ,
                    text : textSend.text
                }
            }) ; 
            return "message sent successfully"
        }
        catch{
            return "error while sending the message" ; 
        }
    }
}
