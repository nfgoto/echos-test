import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Injectable()
export class MongoMemoryService implements OnModuleDestroy {
    private mongoServer: MongoMemoryServer;

    async getUri(): Promise<string> {
        if (!this.mongoServer) {
            this.mongoServer = await MongoMemoryServer.create();
        }
        return this.mongoServer.getUri();
    }

    async onModuleDestroy() {
        await this.mongoServer?.stop();
    }
}
