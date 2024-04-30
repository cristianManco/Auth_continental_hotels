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

export enum typeUser {
  SUPER_ADMIN = 'developer',
  ADMIN = 'admin',
  USER = 'user',
  EMPLOOYE = 'emplooye',
}

@Schema({ timestamps: true })
export class admins extends Document {
  @Prop({ required: true })
  adminId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @IsOptional()
  @Prop({ required: false })
  gender: string;

  @Prop({ required: true })
  phone: string;

  @IsOptional()
  @Prop({ required: true })
  address: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @Prop({ required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  // Minimum length 8 and maximum length 128
  @Length(8, 130)
  // Password must contain at least one uppercase letter, one lowercase letter and one number
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password too weak',
  })
  @Prop({ required: true })
  password: string;

  @IsOptional()
  @IsEnum(typeUser)
  @Prop({ type: String, enum: typeUser, default: typeUser.USER })
  role: typeUser;

  createdAt?: Date;
}

export const adminSchema = SchemaFactory.createForClass(admins);
