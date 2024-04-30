import { AdminModule } from './../../hotels-modules/admin/admin.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './JWT/jwt.strategy';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from 'src/hotels-modules/admin/services/admin.service';
import { EncriptService } from '../shared-modules/encript/encript.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCES_TOKEN_EXPIRE || '1h' },
    }),
    AdminModule,
    AuthModule, // Agrega AdminModule aquí
  ],

  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, AdminService, EncriptService],
})
export class AuthModule {}
