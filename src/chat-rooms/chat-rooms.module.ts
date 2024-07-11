import { Module } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoomsController } from './chat-rooms.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [PrismaModule , AuthModule],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService],
  exports : [ChatRoomsService]
})
export class ChatRoomsModule {}
