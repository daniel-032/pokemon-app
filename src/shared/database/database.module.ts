import { Module, OnModuleInit } from '@nestjs/common';
import { AppDataSource } from './data-source.config';

@Module({})
export class DatabaseModule implements OnModuleInit {
  async onModuleInit() {
    await AppDataSource.initialize();
    console.log('DataSource has been initialized!');
  }
}
