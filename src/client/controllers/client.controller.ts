import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/base.dto';
import { RolesGuardEnum } from 'src/common/enum/user_role.enum';
import { MessageResponseModel } from 'src/common/models/base.model';
import { TrimPipe } from 'src/common/pipes/trim.pipe';
import { Auth } from 'src/core/security/decorators/auth.decorator';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';
import {
  ClientListResponseModel,
  ClientResponseModel,
} from '../models/client.model';
import { ClientService } from '../services/client.service';

@ApiTags('Client')
@UsePipes(new TrimPipe())
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  //create new client
  @Auth(RolesGuardEnum.ADMIN)
  @ApiCreatedResponse({
    type: MessageResponseModel,
  })
  @Post()
  async create(
    @Body() payload: CreateClientDto,
  ): Promise<MessageResponseModel> {
    const result = await this.clientService.create(payload);
    return MessageResponseModel.convert(result);
  }

  //get all client list
  @Auth(RolesGuardEnum.ADMIN)
  @ApiOkResponse({
    description: 'Get all clients with pagination',
    type: ClientListResponseModel,
  })
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<ClientListResponseModel> {
    const [result, total] = await this.clientService.findAll(query);
    return ClientListResponseModel.convert(result, total, query);
  }

  //get client by id
  @Auth(RolesGuardEnum.ADMIN)
  @ApiOkResponse({
    description: 'Get a single client',
    type: ClientResponseModel,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClientResponseModel> {
    const result = await this.clientService.findOne(id);
    return ClientResponseModel.convert(result);
  }

  //update client by id
  @Auth(RolesGuardEnum.ADMIN)
  @ApiOkResponse({
    description: 'Update client data',
    type: ClientResponseModel,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateClientDto,
  ): Promise<ClientResponseModel> {
    const result = await this.clientService.update(id, payload);
    return ClientResponseModel.convert(result);
  }

  //delete client
  @Auth(RolesGuardEnum.ADMIN)
  @ApiOkResponse({
    description: 'delete client data',
    type: MessageResponseModel,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MessageResponseModel> {
    const result = await this.clientService.remove(id);
    return MessageResponseModel.convert(result);
  }
}
