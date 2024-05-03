import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from '../entities/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '../dtos/export';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name) private model: Model<Hotel>) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    try {
      const createdHotel = new this.model(createHotelDto);
      return createdHotel.save();
    } catch (error) {
      throw new HttpException(
        'Error al crear el hotel',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Hotel[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.model.findById(id).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }
    return hotel;
  }

  async update(id: string, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    const updatedHotel = await this.model
      .findByIdAndUpdate(id, updateHotelDto, { new: true })
      .exec();
    if (!updatedHotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }
    return updatedHotel;
  }

  async remove(id: string): Promise<void> {
    const hotel = await this.model.findByIdAndDelete(id).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }
  }
}
