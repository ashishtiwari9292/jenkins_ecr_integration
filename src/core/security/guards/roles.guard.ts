import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RolesGuardEnum } from 'src/common/enum/user_role.enum';
import { User } from 'src/user/entities/user.entity';
import { ROLES_KEY } from '../decorators/auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesGuardEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    //get current user from current context
    const currentUser: User = request.user;

    return requiredRoles.some((role) => currentUser['role']?.includes(role));
  }
}
