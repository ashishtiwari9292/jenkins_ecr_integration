import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';
import { JwtService } from '@nestjs/jwt';
import { SesService } from 'src/aws/ses.service';
import { ResponseMessagesEnum } from 'src/common/enum/response_message.enum';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repositories/user.repositories';
import { ForgetPasswordDto, SignInDto, SignupUserDto } from '../dto/auth.dto';
import { JwtTokenModel } from '../model/jwt.model';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
    private readonly userRepo: UserRepository,
    private readonly sesService: SesService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async createUser(payload: SignupUserDto): Promise<string> {
    try {
      const user = await this.userRepository.findOneData({
        email: payload.email,
      });
      if (user) {
        throw new BadRequestException(ResponseMessagesEnum.EMAIL_EXISTED);
      }
      const encryptedPassWord = await this.bcryptService.hash(payload.password);

      await this.userRepository.saveData({
        ...payload,
        password: encryptedPassWord,
      });
      return ResponseMessagesEnum.SUCCESS;
    } catch (error) {
      console.log('**********************************');
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error.message);
    }
  }

  async signIn(payload: SignInDto): Promise<JwtTokenModel> {
    try {
      const { email, password } = payload;
      const user = await this.userRepository.findOneData({ email });
      if (!user) {
        throw new HttpException(
          ResponseMessagesEnum.INVALID_USER,
          HttpStatus.NOT_FOUND,
        );
      }
      const match = await this.bcryptService.compare(password, user.password);
      if (!match) {
        throw new BadRequestException(
          ResponseMessagesEnum.PASSWORD_OR_EMAIL_NOT_VALID,
        );
      }
      const accessToken = await this.jwtService.signAsync(
        { userId: user.id },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },
      );
      const refreshToken = await this.jwtService.signAsync(
        { userId: user.id },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
      );
      return { accessToken, refreshToken };
    } catch (error) {
      console.log('**********************************');
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error.message);
    }
  }

  public async generateCredentialsBasedOnRefreshToken(refresh: string) {
    try {
      // decode and verify refresh token
      const user = await this.jwtService.verifyAsync(refresh, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      if (!refresh || !user) {
        throw new BadRequestException(ResponseMessagesEnum.ACCESS_DENIED);
      }

      // get user details from database
      const userDetails = await this.userRepo.findOneData({
        email: user.email,
      });

      if (!userDetails) {
        throw new ForbiddenException(FORBIDDEN_MESSAGE);
      }

      // create credentials and return
      const accessToken = await this.jwtService.signAsync(
        { userId: user.id, email: userDetails.email },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },
      );
      const refreshToken = await this.jwtService.signAsync(
        { userId: user.id, email: userDetails.email },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
      );
      return { accessToken, refreshToken };
    } catch (error) {
      console.log('**********************************');
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error.message);
    }
  }

  async changePassword(payload: ForgetPasswordDto): Promise<string> {
    try {
      const { email, resetCode } = payload;
      const user = await this.userRepository.findOneData({
        email,
        otp: resetCode,
      });

      if (!user) {
        throw new BadRequestException(ResponseMessagesEnum.CODE_EXPIRED);
      }
      // Mark unique case as null
      user.otp = null;

      // Encrypt password and save to database
      const encryptedPassWord = await this.bcryptService.hash(
        payload.newPassword,
      );
      user.password = encryptedPassWord;

      // Update new password to the database
      await this.userRepository.updateData({ id: user.id }, user);
      return ResponseMessagesEnum.SUCCESS;
    } catch (error) {
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error?.message);
    }
  }

  // to do ses for otp
  public async requestForgotOtp(email: string) {
    try {
      // check if user exists
      const user = await this.checkUserExistence(email);

      // Add a unique id to user
      const resetCode = this.generateRandomCode();
      user.otp = resetCode;

      await this.sesService.sendSesMail(
        `OTP: ${resetCode}`, // TODO: need to replace with real one template
        ['shushant@yopmail.com'],
        'Reset code',
      );
      await this.userRepository.updateData({ id: user.id }, user);
      return ResponseMessagesEnum.REQUEST_RESET_CODE + ` OTP: ${resetCode}`;
    } catch (error) {
      console.log('**********************************');
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error?.message);
    }
  }

  async checkUserExistence(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneData({ email });
      if (!user) {
        throw new HttpException(
          ResponseMessagesEnum.INVALID_USER,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error?.message);
    }
  }

  generateRandomCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
