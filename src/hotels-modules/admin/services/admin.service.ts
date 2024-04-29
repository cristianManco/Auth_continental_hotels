import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto, UpdateAdminDto } from '../Dtos/common';
import { admins } from '../entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectModel(admins.name) private model: Model<admins>) {}

  async create(createadminsDto: CreateAdminDto): Promise<admins> {
    try {
      // Validar el correo electrónico para el registro
      await this.validateEmailForSignUp(createadminsDto.email);

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
    const admin = await this.model.findOne({ email }).exec();
    if (!admin) {
      throw new NotFoundException(
        `Administrador con correo electrónico ${email} no encontrado`,
      );
    }
    return admin;
  }

  async update(id: string, updateadminsDto: UpdateAdminDto): Promise<admins> {
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
