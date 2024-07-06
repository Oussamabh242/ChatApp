import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: Partial<User>) {
    return await this.prisma.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      },
    });
  }
  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        password: true,
        email: true,
        id: true,
      },
    });
  }

  async getById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        fullName: true,
        email: true,
      },
    });
  }

  async update(id: string, user: { fullName: string }) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...user,
      },
    });
  }
}
