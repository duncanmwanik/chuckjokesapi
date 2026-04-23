import { Module } from '@nestjs/common';
import { JokesModule } from './jokes.module';

@Module({
  imports: [JokesModule],
})
export class AppModule {}