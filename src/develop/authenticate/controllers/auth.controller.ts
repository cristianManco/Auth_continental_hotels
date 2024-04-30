import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { loginDto } from '../Dtos/login.dto';
import { SignupDto } from '../Dtos/signup.dto';
import { Public } from 'src/develop/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userLoginDto: loginDto) {
    return this.authService.login(userLoginDto);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUPDto: SignupDto) {
    return this.authService.register(signUPDto);
  }
}
