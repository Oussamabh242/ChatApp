import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports : [AuthModule , PrismaModule] , 
  controllers: [MessagesController],
  providers: [MessagesService],
  exports : [MessagesService]
})
export class MessagesModule {}
