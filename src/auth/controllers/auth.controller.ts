import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { EmailDto } from 'src/common/dto/base.dto';
import { MessageResponseModel } from '../../common/models/base.model';
import { ForgetPasswordDto, SignInDto } from '../dto/auth.dto';
import { JwtTokenModel, RefreshTokenDto } from '../model/jwt.model';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @ApiCreatedResponse({
  //   type: MessageResponseModel,
  // })
  // @Post('sign-up')
  // async createUser(@Body() payload: SignupUserDto) {
  //   const result = await this.authService.createUser(payload);
  //   return MessageResponseModel.convert(result);
  // }

  @ApiCreatedResponse({
    type: JwtTokenModel,
  })
  @Post('sign-in')
  async signIn(@Body() payload: SignInDto) {
    const result = await this.authService.signIn(payload);
    return JwtTokenModel.convert(result);
  }

  // generate new tokens using refreshToken
  @ApiCreatedResponse({
    type: JwtTokenModel,
  })
  @Post('get-access-token')
  generateCredentialsBasedOnRefreshToken(
    @Body() payload: RefreshTokenDto,
  ): Promise<JwtTokenModel> {
    return this.authService.generateCredentialsBasedOnRefreshToken(
      payload.refreshToken,
    );
  }

  @ApiCreatedResponse({
    type: MessageResponseModel,
  })
  @Post('generate-otp')
  async generateOtp(@Body() payload: EmailDto) {
    const result = await this.authService.requestForgotOtp(payload.email);
    return MessageResponseModel.convert(result);
  }

  @ApiCreatedResponse({
    type: MessageResponseModel,
  })
  @Post('forget-password')
  async changePassword(@Body() payload: ForgetPasswordDto) {
    const result = await this.authService.changePassword(payload);
    return MessageResponseModel.convert(result);
  }
}
