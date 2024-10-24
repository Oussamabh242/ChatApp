import { PartialType } from '@nestjs/mapped-types';
import { CreateFrinedshipDto } from './create-frinedship.dto';

export class UpdateFrinedshipDto extends PartialType(CreateFrinedshipDto) {}
