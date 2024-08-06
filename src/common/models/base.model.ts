import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseModel {
  @ApiProperty()
  message: string;

  static convert(message: string) {
    return { message: message };
  }
}
