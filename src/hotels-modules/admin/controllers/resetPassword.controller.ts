import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ResetPasswordDto } from '../dtos/resetPasswordDto';
import { UsersService } from '../services/user.service'; // Importa tu servicio de usuarios aquí

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { email, newPassword, confirmPassword } = resetPasswordDto;

    // Verifica que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden.');
    }

    // Busca el usuario por su correo electrónico
    const user = await this.usersService.findByEmail(email);

    // Si el usuario no existe, lanza una excepción
    if (!user) {
      throw new BadRequestException(
        'No se encontró un usuario con este correo electrónico.',
      );
    }

    // Actualiza la contraseña del usuario
    user.password = newPassword; // Actualiza la contraseña con la nueva contraseña
    await this.usersService.update(user.id, user); // Actualiza el usuario en la base de datos

    // Puedes enviar un correo electrónico de confirmación aquí:

    return { message: 'Contraseña restablecida exitosamente.' };
  }
}
