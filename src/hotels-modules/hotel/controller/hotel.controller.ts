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
@ApiTags('Hotels')
@ApiBearerAuth()
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Roles('admin')
  @Post('new')
  async create(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    return await this.hotelService.create(createHotelDto);
  }

  @Roles('emplooye')
  @Get('all')
  async findAll(): Promise<Hotel[]> {
    return await this.hotelService.findAll();
  }

  @Roles('user')
  @Get(':_id')
  async findOne(@Param('_id') id: string): Promise<Hotel> {
    return await this.hotelService.findOne(id);
  }

  @Roles('admin')
  @Put(':_id')
  async update(
    @Param('_id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel> {
    return await this.hotelService.update(id, updateHotelDto);
  }

  @Roles('developer')
  @Delete(':_id')
  async remove(@Param('_id') id: string): Promise<void> {
    return await this.hotelService.remove(id);
  }
}
