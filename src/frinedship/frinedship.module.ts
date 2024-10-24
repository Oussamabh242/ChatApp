import { Module } from '@nestjs/common';
import { FrinedshipService } from './frinedship.service';
import { FrinedshipController } from './frinedship.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports :[AuthModule,PrismaModule ] , 
  controllers: [FrinedshipController],
  providers: [FrinedshipService, PrismaService],
})
export class FrinedshipModule {}
