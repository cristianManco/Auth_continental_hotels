// Código para el guardia de autenticación en la aplicación de la cadena de hoteles
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // canActivate: Este método se llama antes del controlador de ruta. Determina si se puede acceder a la ruta. Utiliza Reflector para verificar si el metadata 'IsPublic' está establecido para el controlador de ruta o la clase del controlador. Si 'IsPublic' es verdadero, la ruta se puede acceder sin autenticación.
  canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('IsPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return Promise.resolve(true);

    return super.canActivate(context) as Promise<boolean>;
  }

  // handleRequest: Este método se llama después de que se realiza la autenticación JWT. Si hay un error o un mensaje de información (generalmente cuando el JWT ha caducado o es inválido), registra el error y lanza una HttpException con un estado 401 Unauthorized. Si no hay usuario (lo que significa que el JWT no contiene información de usuario válida), registra una advertencia y lanza una UnauthorizedException. Si todo está bien, simplemente devuelve el usuario.
  handleRequest(err, user, info: Error) {
    if (err || info) {
      console.error(`Error de JWT: ${info.message || err}`);
      throw new UnauthorizedException('Token es inválido o ha expirado.');
    }

    if (!user) {
      console.warn('Acceso denegado: Intento de acceso no autorizado');
      throw new UnauthorizedException('Acceso denegado.');
    }

    return user;
  }
}
