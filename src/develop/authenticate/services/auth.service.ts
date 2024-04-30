import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncriptService } from 'src/develop/shared-modules/encript/encript.service';
import { AdminService } from 'src/hotels-modules/admin/services/admin.service';
import { loginDto, SignupDto } from '../Dtos/export';

export type Tokens = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly encriptService: EncriptService,
  ) {}

  async login(loginDto: loginDto): Promise<Tokens> {
    const { email, password } = loginDto;
    const user = await this.adminService.findOneByEmail(email);

    if (
      !user ||
      !(await this.encriptService.comparePassword(password, user.password))
    ) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }

  async register(signUPDto: SignupDto): Promise<Tokens> {
    await this.validateEmail(signUPDto.email);

    const hashedPassword = await this.adminService.hash(signUPDto.password);

    const user = await this.adminService.create({
      email: signUPDto.email,
      name: signUPDto.name,
      password: hashedPassword,
      clientId: '',
      lastName: '',
      phone: '',
      address: '',
    });

    return await this.getTokens({
      sub: user.id,
    });
  }

  async validateEmail(email: string): Promise<boolean> {
    const user = await this.adminService.findOneByEmailRegister(email);
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    return true; // O devolver false si prefieres indicar que el correo electrónico no existe
  }

  private async getTokens(payload: { sub: string }): Promise<Tokens> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not set');
    }

    const accessTokenOptions = {
      expiresIn: process.env.ACCES_TOKEN_EXPIRE || '20m',
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...accessTokenOptions,
    });

    return { access_token: accessToken };
  }
}
