import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { admins } from '../entities/admin.entity';
import { CreateAdminDto, UpdateAdminDto } from '../Dtos/common/exports';
import { admins } from '../entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectModel(admins.name) private model: Model<admins>) {}

  async create(createadminsDto: CreateAdminDto): Promise<admins> {
    const existingadmins = await this.model
      .findOne({ email: createadminsDto.email })
      .exec();
    if (existingadmins) {
      throw new HttpException(
        `admins with email ${createadminsDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdadmins = new this.model(createadminsDto);
    return createdadmins.save();
  }

  async findAll(): Promise<admins[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<admins> {
    const admins = await this.model.findById(id).exec();
    if (!admins) {
      throw new NotFoundException(`admins with id ${id} not found`);
    }
    return admins;
  }

  async findOneByEmail(email: string): Promise<admins> {
    const admins = await this.model.findOne({ email }).exec();
    if (!admins) {
      throw new NotFoundException(`admins with email ${email} not found`);
    }
    return admins;
  }

  async update(id: string, updateadminsDto: UpdateAdminDto): Promise<admins> {
    const updatedadmins = await this.model
      .findByIdAndUpdate(id, updateadminsDto, { new: true })
      .exec();
    if (!updatedadmins) {
      throw new NotFoundException(`admins with id ${id} not found`);
    }
    return updatedadmins;
  }

  async remove(id: string): Promise<void> {
    const admins = await this.model.findByIdAndDelete(id).exec();
    if (!admins) {
      throw new NotFoundException(`admins with id ${id} not found`);
    }
  }
}
