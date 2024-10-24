import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { FrinedshipService } from './frinedship.service';
import { CreateFrinedshipDto } from './dto/create-frinedship.dto';
import { UpdateFrinedshipDto } from './dto/update-frinedship.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('frinedship')
export class FrinedshipController {
  constructor(private readonly frinedshipService: FrinedshipService) {}

  //@Post()
  //create(@Body() createFrinedshipDto: CreateFrinedshipDto) {
  //  return this.frinedshipService.create(createFrinedshipDto);
  //}
  @Get()
  @UseGuards(AuthGuard)
  getAllFreinds(@Request() req) {
    return this.frinedshipService.findAll(req.user);
  }
  

  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //  return this.frinedshipService.findOne(+id);
  //}
  //
  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateFrinedshipDto: UpdateFrinedshipDto) {
  //  return this.frinedshipService.update(+id, updateFrinedshipDto);
  //}
  //
  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.frinedshipService.remove(+id);
  //}
}
