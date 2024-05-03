import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity'; // Importa la entidad de usuario
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('El usuario no fue encontrado.');
    }
    Object.assign(user, data);
    return this.userRepository.save(user);
  }
}
