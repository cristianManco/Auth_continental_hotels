import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HotelService } from '../service/hotel.service';
import { Hotel } from '../entities/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '../dtos/export';
import { Roles } from 'src/DevServices/decorators/exports';
// import { Public } from 'src/develop/decorators/public.decorator';

// @Public()
@ApiTags('Hotels')  // Etiqueta para categorizar los endpoints relacionados con hoteles en la documentación.
@ApiBearerAuth()    // Indica que este controlador utiliza autenticación mediante Bearer token.
@Controller('hotels')  // Define que el controlador manejará las rutas que comienzan con 'hotels'.
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Roles('admin')  // Restringe el acceso a usuarios con rol de 'admin'.
  @Post('new')
  async create(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    // Método para crear un nuevo hotel. Recibe los datos del hotel a crear en el cuerpo de la solicitud.
    return await this.hotelService.create(createHotelDto);
  }

  @Roles('emplooye')  // Restringe el acceso a usuarios con rol de 'emplooye'.
  @Get('all')
  async findAll(): Promise<Hotel[]> {
    // Método para obtener una lista de todos los hoteles.
    return await this.hotelService.findAll();
  }

  @Roles('user')  // Restringe el acceso a usuarios con rol de 'user'.
  @Get(':id')
  async findOne(@Param('_id') id: string): Promise<Hotel> {
    // Método para obtener un hotel específico por su ID.
    return await this.hotelService.findOne(id);
  }

  @Roles('admin')  // Restringe el acceso a usuarios con rol de 'admin'.
  @Put(':id')
  async update(
    @Param('_id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel> {
    // Método para actualizar los datos de un hotel específico. Recibe el ID del hotel y los nuevos datos en el cuerpo de la solicitud.
    return await this.hotelService.update(id, updateHotelDto);
  }

  @Roles('developer')  // Restringe el acceso a usuarios con rol de 'developer'.
  @Delete(':id')
  async remove(@Param('_id') id: string): Promise<void> {
    // Método para eliminar un hotel específico por su ID.
    return await this.hotelService.remove(id);
  }
}
