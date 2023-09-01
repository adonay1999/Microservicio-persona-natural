import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonaNaturalModule } from './persona-natural/persona-natural.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.prod'],
      isGlobal: true,
    }),
    PersonaNaturalModule,
  ],
})
export class AppModule {}
