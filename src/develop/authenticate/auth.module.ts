import { AdminModule } from './../../hotels-modules/admin/admin.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './JWT/jwt.strategy';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ShareModule } from '../shared-modules/share.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCES_TOKEN_EXPIRE || '1h' },
    }),
    ShareModule,
    AdminModule, // Agrega AdminModule aquí
  ],

  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
