import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/auth/services/bcrypt.service';
import { UserRepository } from 'src/user/repositories/user.repositories';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private bcryptService: BcryptService,
  ) {}
  async getUserById(userId: string) {
    const isUser = await this.userRepository.findOneData({ id: userId });
    return isUser;
  }
}
