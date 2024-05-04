import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user-producer',
        brokers: ['localhost:19092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('user-topic');
    await this.client.connect();
  }

  getHello(): any {
    return this.client.send('user-topic', 'user');
  }
}
