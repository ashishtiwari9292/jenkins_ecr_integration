import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import {
  ResponseCodeEnum,
  ResponseMessagesEnum,
} from 'src/common/enum/response_message.enum';

import { UserRepository } from 'src/user/repositories/user.repositories';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(private userRepository: UserRepository) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request): Promise<boolean> {
    const accessToken = request.headers?.authorization?.replace('Bearer ', '');
    try {
      const userDetails = await this.verifyAccessToken(accessToken);
      if (!accessToken || !userDetails) {
        return false;
      }

      if (!userDetails) {
        throw new HttpException(
          ResponseMessagesEnum.NO_USER_EXISTS,
          ResponseCodeEnum.NO_USER_EXISTS,
        );
      }
      if (userDetails) {
        const user = await this.userRepository.findOne({
          where: {
            id: userDetails.userId,
          },
        });
        if (!user) {
          return;
        }
        request.user = user;
        return true;
      }
      return false;
    } catch (error) {
      this.logger.log('**********************************');
      this.logger.log(error);
      this.logger.log('**********************************');
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  verifyAccessToken(accessToken: string): any {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  }
}
