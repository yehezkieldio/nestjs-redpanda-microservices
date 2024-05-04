import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Kafka, Partitioners } from 'kafkajs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api-gateway',
        brokers: ['localhost:19092'],
        ssl: false,
      },
      consumer: {
        allowAutoTopicCreation: true,
        groupId: 'elizielx-group',
      },
      producer: {
        allowAutoTopicCreation: true,
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('fibo');
    await this.client.connect();

    const kafka = new Kafka({
      clientId: 'api-gateway',
      brokers: ['localhost:19092'],
    });

    const admin = kafka.admin();
    const topics = await admin.listTopics();

    if (!topics.includes('fibo')) {
      await admin.createTopics({
        topics: [{ topic: 'fibo' }],
      });
    }

    if (!topics.includes('fibo.reply')) {
      await admin.createTopics({
        topics: [{ topic: 'fibo.reply' }],
      });
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  private getFiboResult() {
    return new Promise((resolve) => {
      this.client
        .send('fibo', JSON.stringify({ num: 40 }))
        .subscribe((result: number) => {
          resolve(result);
        });
    });
  }

  @Get('fibonacci')
  async getFibonacci() {
    const fibo = await this.getFiboResult();
    return fibo;
  }
}
