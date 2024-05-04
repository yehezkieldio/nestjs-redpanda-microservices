"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const uuid_1 = require("uuid");
const kafkajs_1 = require("kafkajs");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: `consumer-${(0, uuid_1.v4)()}`,
                brokers: ['localhost:19092'],
                ssl: false,
            },
            consumer: {
                allowAutoTopicCreation: true,
                groupId: 'elizielx-consumer-group',
            },
            producer: {
                allowAutoTopicCreation: true,
                createPartitioner: kafkajs_1.Partitioners.LegacyPartitioner,
            },
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map