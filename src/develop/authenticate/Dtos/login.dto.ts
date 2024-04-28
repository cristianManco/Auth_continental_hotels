import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class loginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toloWerCase())
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, { message: 'password should be minimmum 8' })
  @MaxLength(50, { message: 'password should be maximium 50' })
  password: string;
}
