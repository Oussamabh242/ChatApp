import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from './dto/respond.dto';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';
import { send } from 'process';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService , private readonly chatRoomsService : ChatRoomsService) {}
  async sendRequest(uid: string, sender: string) {
    const request = await this.prisma.request.create({
      data: {
        senderId: sender,
        recivedId: uid,
      },
    });
    return request
  }

  async getRequests(id: string) {
    const requests = await this.prisma.request.findMany({
      where: {
        recivedId: id,
        status: 'pending',
      },
      select: {
        sender: {
          select: {
            fullName: true,
            id: true
          },
        },
        date: true,
      },
    });
    return requests;
  }
  async handleResponse(response: ResponseDto, userid: string) {
    if (response.response === true) {
      const x = await this.prisma.request.findUnique({where:{id : response.reqid}}) ; 
      await this.prisma.request.delete({where:{id:response.reqid}})
      const friendship = await this.prisma.friend.create({
        data: {
          user1 : x.recivedId , 
          user2 : x.senderId , 
        }
      }) ; 

      return 'you acceppted the request';
    } else {
      this.refuseRequest(response.reqid, userid);
      return 'you refused the request';
    }
  }
  async acceptRequest(reqid: string, uid: string) {
    return await this.prisma.request.update({
      where: {
        id: reqid,
        recivedId: uid,
      },
      data: {
        status: 'confirmed',
      },
    });
  }

  async refuseRequest(reqid: string, uid: string) {
    return await this.prisma.request.delete({
      where: {
        id: reqid,
        recivedId: uid,
      },
    });
  }
}
