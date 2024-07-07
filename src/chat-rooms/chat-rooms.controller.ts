import { Controller, Get, Param } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';

@Controller('chatrooms')
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Get(":chatid")
  chatRoomInfo(@Param() {chatid} : {chatid:  string} ){
    console.log(chatid) ; 
    return this.chatRoomsService.getChatInfo(chatid) ; 
  }
}
