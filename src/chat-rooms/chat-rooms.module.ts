import { Module } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoomsController } from './chat-rooms.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports : [PrismaModule],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService],
  exports : [ChatRoomsService]
})
export class ChatRoomsModule {}
