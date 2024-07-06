import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from './dto/respond.dto';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}
  async sendRequest(uid: string, sender: string) {
    const request = await this.prisma.request.create({
      data: {
        senderId: sender,
        recivedId: uid,
      },
    });
    return request;
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
          },
        },
        date: true,
      },
    });
    return requests;
  }
  handleResponse(response: ResponseDto, uid: string) {
    if (response.response === true) {
      this.acceptRequest(response.reqid, uid);
      return 'you acceppted the request';
    } else {
      this.refuseRequest(response.reqid, uid);
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
