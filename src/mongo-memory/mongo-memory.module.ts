import { Module } from '@nestjs/common';
import { MongoMemoryService } from './mongo-memory.service';

@Module({
    providers: [MongoMemoryService],
    exports: [MongoMemoryService],
})
export class MongoMemoryModule { }
