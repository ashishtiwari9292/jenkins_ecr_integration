import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/base.dto';
import { Client } from '../entities/client.entity';

export class ClientModel {
  @ApiProperty({ description: 'id' })
  id: string;

  @ApiProperty({ description: 'Name of the client' })
  clientName: string;

  @ApiProperty({ description: 'Name of the project' })
  projectName: string;

  @ApiProperty({ description: 'Origin of the client' })
  origin: string;

  @ApiProperty({ description: 'Shipping address line 1' })
  shipAddressLine1: string;

  @ApiPropertyOptional({
    description: 'Shipping address line 2',
    maxLength: 500,
    required: false,
  })
  shipAddressLine2: string;

  @ApiProperty({ description: 'Shipping city' })
  shipCity: string;

  @ApiProperty({ description: 'Shipping state' })
  shipState: string;

  @ApiProperty({ description: 'Shipping zip code' })
  shipZip: string;

  @ApiProperty({
    description: 'Invoice address line 1',
    maxLength: 500,
    required: false,
  })
  invoiceAddressLine1: string;

  @ApiPropertyOptional({
    description: 'Invoice address line 2',
    maxLength: 500,
  })
  invoiceAddressLine2?: string;

  @ApiProperty({ description: 'Invoice city' })
  invoiceCity: string;

  @ApiProperty({ description: 'Invoice state' })
  invoiceState: string;

  @ApiProperty({ description: 'Invoice zip code' })
  invoiceZip: string;

  @ApiProperty({ description: 'Invoice zip code' })
  createdAt: Date;

  static convert(client: Client): ClientModel {
    const result: ClientModel = {
      id: client.id,
      clientName: client.clientName,
      projectName: client.projectName,
      origin: client.origin,
      shipAddressLine1: client.shipAddressLine1,
      shipAddressLine2: client.shipAddressLine2,
      shipCity: client.shipCity,
      shipState: client.shipState,
      shipZip: client.shipZip,
      invoiceAddressLine1: client.invoiceAddressLine1,
      invoiceCity: client.invoiceCity,
      invoiceState: client.invoiceState,
      invoiceZip: client.invoiceZip,
      createdAt: client.createdAt,
    };
    return result;
  }
}

export class ClientListResponseModel {
  @ApiProperty({
    description: 'List of employees',
    type: ClientModel,
    isArray: true,
  })
  result: ClientModel[];

  @ApiProperty({
    description: 'Total number of employees',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of employees per page',
    example: 10,
  })
  limit: number;

  static convert(
    list: Client[],
    total,
    pagination: PaginationDto,
  ): ClientListResponseModel {
    return {
      result: list.map(ClientModel.convert),
      total: total,
      page: pagination.page,
      limit: pagination.limit,
    };
  }
}

export class ClientResponseModel {
  @ApiProperty({
    type: ClientModel,
  })
  result: ClientModel;

  static convert(employee: Client): ClientResponseModel {
    return { result: ClientModel.convert(employee) };
  }
}
