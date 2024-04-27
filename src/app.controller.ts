import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
  ) {}


  @Get()
  getHome(): string {
    return this.appService.home();
  }

}