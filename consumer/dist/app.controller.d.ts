import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    private fibonacci;
    getFibonacci(message: {
        num: number;
    }): any;
}
