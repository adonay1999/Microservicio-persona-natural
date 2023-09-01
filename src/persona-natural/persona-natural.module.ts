import { Module } from '@nestjs/common';
import { PersonaNaturalController } from './persona-natural.controller';
import { PersonaNaturalService } from './persona-natural.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env.prod',
    }),
  ],
  controllers: [PersonaNaturalController],
  providers: [PersonaNaturalService, PrismaService],

})
export class PersonaNaturalModule { }
