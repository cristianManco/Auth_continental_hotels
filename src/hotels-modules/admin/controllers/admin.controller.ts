import { Roles } from './../../../DevServices/decorators/roles.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { CreateAdminDto, UpdateAdminDto } from '../dtos/exports';
import { Admin } from '../entities/admin.entity';

@ApiTags('Admins')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Roles('admin')
  @Post('new')
  @UsePipes(new ValidationPipe())
  async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.service.create(createAdminDto);
  }

  @Roles('employe')
  @Get('all')
  async findAll() {
    return await this.service.findAll();
  }

  @Roles('employe')
  @Get(':_id')
  async findOne(@Param('_id') id: string) {
    return await this.service.findOne(id);
  }

  @Roles('admin')
  @Put('path/:_id')
  async update(
    @Param('_id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return await this.service.update(id, updateAdminDto);
  }

  @Roles('developer')
  @Delete(':_id')
  async remove(@Param('_id') id: string) {
    return await this.service.remove(id);
  }
}