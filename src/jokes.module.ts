import { Module } from '@nestjs/common';
import { JokesController } from './app.controller';
import { JokesService } from './app.service';

@Module({
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}


 
