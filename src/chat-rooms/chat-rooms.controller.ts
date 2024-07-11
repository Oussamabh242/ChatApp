import { Controller, Get, Param, UseGuards, Post, Body, Request } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('chatrooms')
@UseGuards(AuthGuard)
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Get(":chatid")
  chatRoomInfo(@Param() {chatid} : {chatid:  string} ){
    return this.chatRoomsService.getChatInfo(chatid) ; 
  }

  @Post()
  addUserRoom(@Body() {users , chatid} : {users: string[] , chatid :string} , @Request() req){
    return this.chatRoomsService.addUserToChat(users,chatid  )  ; 
  }
}
