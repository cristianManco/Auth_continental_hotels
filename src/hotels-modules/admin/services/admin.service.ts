import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { admins } from '../entities/admin.entity';
import { CreateAdminDto, UpdateUserDto } from '../dtos/exports';

@Injectable()
export class AdminService {
  [x: string]: any;
  constructor(@InjectModel(admins.name) private model: Model<admins>) {}

  async create(createadminsDto: CreateAdminDto): Promise<admins> {
    try {
      // Validar el correo electrónico para el registro
      await this.findOneByEmail(createadminsDto.email);

      // Crear el administrador
      const createdadmins = new this.model(createadminsDto);
      return createdadmins.save();
    } catch (error) {
      // Manejar errores aquí (por ejemplo, enviar un mensaje de error personalizado)
      throw new HttpException(
        'Error al crear el administrador',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<admins[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<admins> {
    const admin = await this.model.findById(id).exec();
    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }
    return admin;
  }

  async findOneByEmail(email: string): Promise<admins> {
    const user = await this.model.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOneByEmailRegister(email: string): Promise<admins> {
    const user = await this.model.findOne({ email }).exec();
    if (user) {
      throw new NotFoundException(`User with email ${email} already exists`);
    }
    return user;
  }

  async update(id: string, updateadminsDto: UpdateUserDto): Promise<admins> {
    const updatedadmins = await this.model
      .findByIdAndUpdate(id, updateadminsDto, { new: true })
      .exec();
    if (!updatedadmins) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
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
