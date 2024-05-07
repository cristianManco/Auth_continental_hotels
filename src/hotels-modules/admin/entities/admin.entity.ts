// Código para la entidad de administrador en la aplicación de la cadena de hoteles
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Document } from 'mongoose';

export enum UserType {
  SUPER_ADMIN = 'developer',
  ADMIN = 'admin',
  USER = 'user',
  EMPLOYEE = 'emplooye',
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
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(50, {
    message: 'La contraseña no puede exceder los 50 caracteres',
  })
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
