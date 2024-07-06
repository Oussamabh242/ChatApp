import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Get,
  Put,
  Param,
  Req,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseDto } from './dto/respond.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @UseGuards(AuthGuard)
  makeRequest(@Body() { reciver }: { reciver: string }, @Request() req) {
    try {
      return this.requestService.sendRequest(reciver, req.user);
    } catch {
      return 'something wrong happend while sneding a request';
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  getAllRequest(@Request() req) {
    return this.requestService.getRequests(req.user);
  }

  @Put()
  @UseGuards(AuthGuard)
  respondRequest(@Body() response: ResponseDto, @Request() req) {
    return this.requestService.handleResponse(response, req.user);
  }
}
