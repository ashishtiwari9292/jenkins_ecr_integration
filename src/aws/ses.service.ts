import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ResponseMessagesEnum } from 'src/common/enum/response_message.enum';

@Injectable()
export class SesService {
  //SES setup
  private client: SESClient;
  constructor() {
    this.client = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
  }

  //Send mail
  public async sendSesMail(
    emailTemplate: string,
    destination: string[],
    subject?: string,
    source?: string,
  ) {
    const params = {
      Destination: {
        ToAddresses: destination,
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailTemplate,
          },
        },
        Subject: { Data: subject },
      },
      Source: ` ${process.env.FROM_MAIL}`,
    };

    try {
      const command = new SendEmailCommand(params);
      const response = await this.client.send(command);
      return response;
    } catch (err) {
      console.log('******************************');
      console.log(err);
      console.log('******************************');
      throw new BadRequestException(ResponseMessagesEnum.FAILED);
    }
  }
}
