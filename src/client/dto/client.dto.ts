import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class ClientDto {
  @ApiProperty({ description: 'Name of the client', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 200)
  clientName: string;

  @ApiProperty({ description: 'Name of the project', maxLength: 500 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 500)
  projectName: string;

  @ApiProperty({ description: 'Origin of the client', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 200)
  origin: string;

  @ApiProperty({ description: 'Shipping address line 1', maxLength: 500 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 500)
  shipAddressLine1: string;

  @ApiPropertyOptional({
    description: 'Shipping address line 2',
    maxLength: 500,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  shipAddressLine2?: string;

  @ApiProperty({ description: 'Shipping city', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 200)
  shipCity: string;

  @ApiProperty({ description: 'Shipping state', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 200)
  shipState: string;

  @ApiProperty({ description: 'Shipping zip code', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  shipZip: string;

  @ApiProperty({
    description: 'Invoice address line 1',
    maxLength: 500,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 500)
  invoiceAddressLine1: string;

  @ApiPropertyOptional({
    description: 'Invoice address line 2',
    maxLength: 500,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  invoiceAddressLine2?: string;

  @ApiProperty({ description: 'Invoice city', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 200)
  invoiceCity: string;

  @ApiProperty({ description: 'Invoice state', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 200)
  invoiceState: string;

  @ApiProperty({ description: 'Invoice zip code', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  invoiceZip: string;
}

export class CreateClientDto extends ClientDto {}

export class UpdateClientDto extends PartialType(ClientDto) {}
