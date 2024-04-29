import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncriptService } from 'src/develop/shared-modules/encript/encript.service';
import { AdminService } from 'src/hotels-modules/admin/services/admin.service';
import { loginDto } from '../Dtos/login.dto';
import { SignupDto } from '../Dtos/signup.dto';

export type Tokens = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: AdminService,
    private readonly encriptPassword: EncriptService,
  ) {}

  async login(userLoginDto: loginDto): Promise<Tokens | null> {
    const user = await this.usersService.findOneByEmail(userLoginDto.email);
    if (user) {
      const isMatch = await this.encriptPassword.comparePassword(
        userLoginDto.password,
        user.password,
      );
      if (isMatch) {
        const payload = { email: user.email };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    return null;
  }

  async register(signUPDto: SignupDto): Promise<Tokens> {
    try {
      // Validar el correo electrónico para el registro
      await this.validateEmailForSignUp(signUPDto.email);

      // Generar el hash de la contraseña
      const hashedPassword = await this.encriptPassword.hash(
        signUPDto.password,
      );

      // Crear el usuario con el rol 'user'
      const user = await this.usersService.create({
        email: signUPDto.email,
        name: signUPDto.name,
        password: hashedPassword,
        // role: 'user', // Agrega la propiedad 'role' con un valor apropiado
      });

      // Obtener los tokens para el usuario
      const tokens = await this.getTokens({
        sub: user.id,
      });

      return tokens;
    } catch (error) {
      // Manejar errores aquí (por ejemplo, enviar un mensaje de error personalizado)
      throw new HttpException(
        'Error al registrar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateEmailForSignUp(email: string): Promise<void> {
    const user = await this.usersService.findOneByEmailRegister(email);

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
  }

  // Implementa tu método getTokens aquí

  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not set');
    }
    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    };

    const accessToken = await this.signToken(
      jwtPayload,
      secretKey,
      accessTokenOptions,
    );

    return { access_token: accessToken };
  }
}
