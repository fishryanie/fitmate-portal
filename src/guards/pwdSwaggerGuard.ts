// src/guards/password.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
const PASSWORD_IMPORT_KEY = 'PASSWORD_IMPORT_KEY';

export const PasswordSwagger = (password: string) => SetMetadata(PASSWORD_IMPORT_KEY, password);

@Injectable()
export class PasswordSwaggerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const password = request.headers[PASSWORD_IMPORT_KEY];
    const validPassword = this.reflector.get<string>(PASSWORD_IMPORT_KEY, context.getHandler());
    if (password === validPassword) {
      return true;
    }
    throw new UnauthorizedException('Invalid password');
  }
}
