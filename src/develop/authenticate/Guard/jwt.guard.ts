import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(AtGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('IsPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic || (await super.canActivate(context));
  }

  handleRequest(err, user, info: Error) {
    if (err || info) {
      console.error(`Error de JWT: ${info?.message || err}`);
      throw new UnauthorizedException('Token es inválido o ha expirado.');
    }
    if (!user) {
      this.logger.warn('Acceso denegado: Intento de acceso no autorizado');
      throw new UnauthorizedException('Acceso denegado.');
    }
    return user;
  }
}
