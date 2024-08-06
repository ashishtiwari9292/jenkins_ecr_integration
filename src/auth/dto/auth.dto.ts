import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { EmailDto } from 'src/common/dto/base.dto';
import { UserRoleEnum } from 'src/common/enum/user_role.enum';

export class SignInDto extends EmailDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class ForgetPasswordDto extends EmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 12)
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 6)
  resetCode: number;
}

export class SignupUserDto extends EmailDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
