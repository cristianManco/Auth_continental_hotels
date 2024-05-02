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
// import { Public } from 'src/develop/decorators/public.decorator';

// @Public()
@ApiTags('admins')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Post('new')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.service.create(createAdminDto);
  }

  @Get('all')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('_id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('_id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.service.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('_id') id: string) {
    return this.service.remove(id);
  }
}
