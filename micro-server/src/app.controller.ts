import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user-topic')
  getHello(@Payload() message): string {
    console.log(message);

    return this.appService.getHello();
  }
}
