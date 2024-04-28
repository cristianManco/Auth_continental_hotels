import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './JWT/jwt.strategy';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
