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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateAdminDto, UpdateAdminDto } from '../Dtos/common/exports';
import { AdminService } from '../services/admin.service';

@ApiTags('admins')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Post('new')
  create(@Body() CreateAdminDto: CreateAdminDto) {
    return this.service.create(CreateAdminDto);
  }

  @Get('all')
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
