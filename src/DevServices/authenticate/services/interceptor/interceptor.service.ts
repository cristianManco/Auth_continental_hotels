import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlacklistService } from '../blacklist/blacklist.service';

@Injectable()
export class InterceptorService implements NestInterceptor {
  constructor(private readonly blacklist: BlacklistService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization; // Obtener el token de la solicitud (aquí asumo que el token está en el encabezado Authorization)

    // Verificar si el token está en la lista negra
    const isBlacklisted = await this.blacklist.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new UnauthorizedException(
        'El token del usuario está en la lista negra.',
      );
    }

    return next.handle();
  }
}
