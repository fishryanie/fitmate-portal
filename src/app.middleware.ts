import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '#api/auth/auth.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(
    // private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async use(request: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Access denied! no token provided.');
    }
    // try {
    //   const decoded = await this.jwt.verifyAsync(token, {
    //     secret: process.env.JWT_SECRET_KEY,
    //   });
    //   // 💡 We're assigning the payload to the request object here
    //   // so that we can access it in our route handlers
    //   request['user'] = decoded;
    // } catch {
    //   throw new UnauthorizedException();
    // }
  }
}
