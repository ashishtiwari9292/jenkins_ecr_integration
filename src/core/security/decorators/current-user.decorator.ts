import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext): Partial<User> => {
    const user = context.switchToHttp().getRequest().user;
    return data ? user?.[data] : user;
  },
);
