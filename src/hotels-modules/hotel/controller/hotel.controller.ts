import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { HotelService } from '../service/hotel.service';
import { Hotel } from '../entities/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '../dtos/export';
import { Roles } from 'src/develop/decorators/roles.decorator';
import { Public } from 'src/develop/decorators/public.decorator';

@Public()
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Roles('admin')
  @Post('new')
  async create(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.hotelService.create(createHotelDto);
  }

  @Get('all')
  async findAll(): Promise<Hotel[]> {
    return this.hotelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('_id') id: string): Promise<Hotel> {
    return this.hotelService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('_id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Delete(':id')
  async remove(@Param('_id') id: string): Promise<void> {
    return this.hotelService.remove(id);
  }
}
