import { Roles } from './../../../DevServices/decorators/roles.decorator';
// Código para el controlador de administradores en la aplicación de la cadena de hoteles
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
import { AdminService } from '../services/admin.service';
import { CreateAdminDto, UpdateAdminDto } from '../dtos/exports';
import { Admin } from '../entities/admin.entity';
// import { Public } from 'src/develop/decorators/public.decorator';

// @Public()
@ApiTags('Admins')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Roles('admin')
  @Post('new')
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.service.create(createAdminDto);
  }

  @Roles('emplooye')
  @Get('all')
  async findAll() {
    return await this.service.findAll();
  }

  @Roles('emplooye')
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
