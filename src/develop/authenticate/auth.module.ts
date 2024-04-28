import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './JWT/jwt.strategy';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCES_TOKEN_EXPIRE || '1h' },
    }),
  ],

  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
