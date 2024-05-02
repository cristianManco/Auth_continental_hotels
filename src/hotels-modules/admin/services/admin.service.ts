// Código para el servicio de administradores en la aplicación de la cadena de hoteles
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../entities/admin.entity';
import { CreateAdminDto, UpdateAdminDto } from '../dtos/exports';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private model: Model<Admin>) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      // Verificar si el correo electrónico ya está registrado
      const existingAdmin = await this.model
        .findOne({ email: createAdminDto.email })
        .exec();
      if (existingAdmin) {
        throw new HttpException(
          'El correo electrónico ya está registrado',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Crear el nuevo administrador
      const newAdmin = await this.model.create(createAdminDto);
      return await newAdmin;
    } catch (error) {
      throw new HttpException(
        'Error al crear el usuario: ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Admin[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    const admin = await this.model.findById(id).exec();
    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }
    return admin;
  }

  async findOneByEmail(email: string): Promise<Admin> {
    const admin = await this.model.findOne({ email }).exec();
    if (!admin) {
      throw new NotFoundException(
        `Administrador con correo electrónico ${email} no encontrado`,
      );
    }
    return admin;
  }

  async findOneByEmailRegister(email: string): Promise<Admin> {
    const admin = await this.model.findOne({ email }).exec();
    if (admin) {
      throw new HttpException(
        `Administrador con correo electrónico ${email} ya existe`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const updatedAdmin = await this.model
      .findByIdAndUpdate(id, updateAdminDto, { new: true })
      .exec();
    if (!updatedAdmin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }
    return updatedAdmin;
  }

  async remove(id: string): Promise<void> {
    const admin = await this.model.findByIdAndDelete(id).exec();
    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }
  }
}
