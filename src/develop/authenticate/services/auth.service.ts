import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/develop/shared-modules/encript/encript.service';
import { AdminService } from 'src/hotels-modules/admin/services/admin.service';
import { UserLoginDto, SignUpDto } from '../Dtos/export';
import { Tokens } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly encriptService: HashService,
  ) {}

  async login(loginDto: UserLoginDto): Promise<Tokens> {
    const { email, password } = loginDto;
    const user = await this.adminService.findOneByEmail(email);

    if (
      !user ||
      !(await this.encriptService.compare(password, user.password))
    ) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.getTokens({ sub: user.id });
  }

  async register(signUPDto: SignUpDto): Promise<Tokens> {
    await this.validateEmail(signUPDto.email);

    const hashedPassword = await this.encriptService.hash(signUPDto.password);

    const user = await this.adminService.create({
      email: signUPDto.email,
      name: signUPDto.name,
      password: hashedPassword,
      clientId: '1', // Agregar el campo clientId si es necesario
      lastName: 'correa', // Agregar el campo lastName si es necesario
      phone: '1234', // Agregar el campo phone si es necesario
      address: 'CR 84 #16', // Agregar el campo address si es necesario
    });

    return this.getTokens({ sub: user.id });
  }

  private async getTokens(payload: { sub: string }): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken };
  }

  private async validateEmail(email: string): Promise<void> {
    const user = await this.adminService.findOneByEmailRegister(email);
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
  }
}
