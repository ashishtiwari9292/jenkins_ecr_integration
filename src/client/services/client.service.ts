import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/base.dto';
import { ResponseMessagesEnum } from 'src/common/enum/response_message.enum';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';
import { Client } from '../entities/client.entity';
import { ClientRepository } from '../repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepo: ClientRepository) {}

  async create(payload: CreateClientDto): Promise<ResponseMessagesEnum> {
    try {
      //save data in db
      await this.clientRepo.saveData(payload);
      return ResponseMessagesEnum.SUCCESS;
    } catch (error) {
      console.log('**********************************');
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: PaginationDto): Promise<[Client[], number]> {
    try {
      const pagination = query.getPagination;
      return await this.clientRepo.findAllData({}, pagination);
    } catch (error) {
      console.log('**********************************');
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<Client> {
    try {
      const client = await this.clientRepo.findOneData({ id });
      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      return client;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, payload: UpdateClientDto): Promise<Client> {
    try {
      const client = await this.findOne(id); // Ensure the client exists
      Object.assign(client, payload);
      return await this.clientRepo.saveData(client);
    } catch (error) {
      console.log('**********************************');
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<ResponseMessagesEnum> {
    try {
      await this.findOne(id); // Ensure the client exists
      await this.clientRepo.softDelete({ id });
      return ResponseMessagesEnum.SUCCESS;
    } catch (error) {
      console.log('**********************************');
      console.log(error);
      console.log('**********************************');
      throw new BadRequestException(error.message);
    }
  }
}
