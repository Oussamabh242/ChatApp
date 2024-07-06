import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsBoolean,
} from 'class-validator';
export class ResponseDto {
  @IsString()
  @IsNotEmpty()
  reqid: string;

  @IsBoolean()
  @IsNotEmpty()
  response: boolean;
}
