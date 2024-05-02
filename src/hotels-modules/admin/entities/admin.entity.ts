// Código para la entidad de administrador en la aplicación de la cadena de hoteles
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  IsEnum,
} from 'class-validator';
import { Document } from 'mongoose';

export enum UserType {
  SUPER_ADMIN = 'developer',
  ADMIN = 'admin',
  USER = 'user',
  EMPLOYEE = 'employee',
}

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @Prop({ required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 130)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'The password is not secure enough try with more characters',
  })
  @Prop({ required: true })
  password: string;

  @IsOptional()
  @IsEnum(UserType)
  @Prop({ type: String, enum: UserType, default: UserType.USER })
  role: UserType;

  createdAt?: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
