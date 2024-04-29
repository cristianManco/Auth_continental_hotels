import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { loginDto } from '../Dtos/login.dto';
import { SignupDto } from '../Dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userLoginDto: loginDto) {
    return this.authService.login(userLoginDto);
  }

  @Post('register')
  register(@Body() signUPDto: SignupDto) {
    return this.authService.register(signUPDto);
  }
}
