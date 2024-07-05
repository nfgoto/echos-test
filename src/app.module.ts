import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryModule } from './mongo-memory/mongo-memory.module';
import { MongoMemoryService } from './mongo-memory/mongo-memory.service';
import config from './config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongoMemoryModule,
    MongooseModule.forRoot(config().mongoUri)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
