import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
