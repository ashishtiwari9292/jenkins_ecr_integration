import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesGuardEnum } from 'src/common/enum/user_role.enum';
import { JwtAuthGuard } from '../guards/jwt-guard';

export const ROLES_KEY = 'roles';

export function Auth(...roles: RolesGuardEnum[]) {
  const role = roles.length ? roles.join(' | ') : 'Authorized User';
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({
      description: 'This api can be accessed by: ' + role,
    }),
  );
}
