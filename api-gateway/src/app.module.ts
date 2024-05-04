import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FIBO_SERVICE',
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
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
