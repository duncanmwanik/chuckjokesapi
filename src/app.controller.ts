import { Body, Controller, Get, Post } from '@nestjs/common';
import { JokesService } from './app.service';

@Controller('jokes')
export class JokesController {
  constructor(private readonly service: JokesService) {}

  @Post('submit')
  submit(@Body('text') text: string) {
    return this.service.submit(text);
  }

  @Get('random')
  random() {
    return this.service.random();
  }

  @Post('rate')
  rate(
    @Body('id') id: string,
    @Body('rating') rating: number,
  ) {
    return this.service.rate(id, rating);
  }
}