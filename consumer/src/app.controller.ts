import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private fibonacci(n: number) {
    return n < 1
      ? 0
      : n <= 2
        ? 1
        : this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  @MessagePattern('fibo')
  getFibonacci(@Payload() message: { num: number }) {
    console.log('CONSUMER - RECEIVING');
    const { num } = message;
    console.log('CONSUMER - PAYLOAD', message);

    return this.fibonacci(num);
  }
}
