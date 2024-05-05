import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto, SignUpDto } from '../dtos/export';
import { Public } from 'src/DevServices/decorators/exports';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body('token') token: string) {
    await this.authService.logout(token);
    return { message: 'Logout successful' };
  }
}
