import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HotelService } from '../service/hotel.service';
import { Hotel } from '../entities/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '../dtos/export';
import { Roles } from 'src/DevServices/decorators/exports';

<<<<<<< HEAD
@ApiTags('Hotels')
@ApiBearerAuth()
@Controller('hotels')
=======
// @Public()
@ApiTags('Hotels')  // Etiqueta para categorizar los endpoints relacionados con hoteles en la documentación.
@ApiBearerAuth()    // Indica que este controlador utiliza autenticación mediante Bearer token.
@Controller('hotels')  // Define que el controlador manejará las rutas que comienzan con 'hotels'.
>>>>>>> b58b4b7cbdd15ab20ac3c474369cd615aa02d82b
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Roles('admin')  // Restringe el acceso a usuarios con rol de 'admin'.
  @Post('new')
<<<<<<< HEAD
  @UsePipes(new ValidationPipe())
  async createHotel(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    return await this.hotelService.create(createHotelDto);
  }

  @Roles('employe')
=======
  async create(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    // Método para crear un nuevo hotel. Recibe los datos del hotel a crear en el cuerpo de la solicitud.
    return await this.hotelService.create(createHotelDto);
  }

  @Roles('emplooye')  // Restringe el acceso a usuarios con rol de 'emplooye'.
>>>>>>> b58b4b7cbdd15ab20ac3c474369cd615aa02d82b
  @Get('all')
  async findAll(): Promise<Hotel[]> {
    // Método para obtener una lista de todos los hoteles.
    return await this.hotelService.findAll();
  }

<<<<<<< HEAD
  @Roles('user')
  @Get(':_id')
=======
  @Roles('user')  // Restringe el acceso a usuarios con rol de 'user'.
  @Get(':id')
>>>>>>> b58b4b7cbdd15ab20ac3c474369cd615aa02d82b
  async findOne(@Param('_id') id: string): Promise<Hotel> {
    // Método para obtener un hotel específico por su ID.
    return await this.hotelService.findOne(id);
  }

<<<<<<< HEAD
  @Roles('admin')
  @Put(':_id')
=======
  @Roles('admin')  // Restringe el acceso a usuarios con rol de 'admin'.
  @Put(':id')
>>>>>>> b58b4b7cbdd15ab20ac3c474369cd615aa02d82b
  async update(
    @Param('_id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel> {
    // Método para actualizar los datos de un hotel específico. Recibe el ID del hotel y los nuevos datos en el cuerpo de la solicitud.
    return await this.hotelService.update(id, updateHotelDto);
  }

<<<<<<< HEAD
  @Roles('developer')
  @Delete(':_id')
=======
  @Roles('developer')  // Restringe el acceso a usuarios con rol de 'developer'.
  @Delete(':id')
>>>>>>> b58b4b7cbdd15ab20ac3c474369cd615aa02d82b
  async remove(@Param('_id') id: string): Promise<void> {
    // Método para eliminar un hotel específico por su ID.
    return await this.hotelService.remove(id);
  }
}
