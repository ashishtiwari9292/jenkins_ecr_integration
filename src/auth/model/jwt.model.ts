import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// Jwt token response
export class JwtTokenModel {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  static convert(tokens: JwtTokenModel) {
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
