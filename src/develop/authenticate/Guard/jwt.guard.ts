import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error) {
    if (err || info) {
      this.logger.error(`Error: ${info.message || err}`);
      throw new HttpException(
        'Token acces expired!   Please try again',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    if (!user) {
      this.logger.warn('Access Denied: Unauthorized access attempt');
      throw new UnauthorizedException('Access Denied.');
    }

    return user;
  }
}
