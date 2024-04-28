import { UpdateAdminDto } from './../Dtos/common/updateAdminDto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto, UpdateAdminDto } from '../Dtos/common/exports';
import { AdminService } from '../services/admin.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Post()
  create(@Body() CreateAdminDto: CreateAdminDto) {
    return this.service.create(CreateAdminDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateAdminDto: UpdateAdminDto) {
    return this.service.update(id, UpdateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
