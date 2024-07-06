import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Signin(@Body() user: SigninDto) {
    return await this.authService.singIn(user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return this.authService.profile(req.user);
  }
}
