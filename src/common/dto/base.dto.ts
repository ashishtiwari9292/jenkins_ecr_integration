import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class EmailDto {
  @ApiProperty()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  get getPagination(): { skip: number; take: number } {
    const skip = (this.page - 1) * this.limit;
    const take = this.limit;
    return { skip, take };
  }
}
