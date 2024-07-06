import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userPrisma: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async singIn(user: SigninDto) {
    const userDb = await this.userPrisma.getByEmail(user.email);
    if (!userDb) {
      throw new UnauthorizedException('invalid Credentials');
    }

    if (userDb.password != user.password) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { uid: userDb.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profile(id: string) {
    try {
      const user = await this.userPrisma.getById(id);
      return user;
    } catch {
      return 'user Not Found';
    }
  }
}
