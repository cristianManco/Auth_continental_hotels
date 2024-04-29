import { CreateAdminDto } from './createAdminDto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateAdminDto) {}
