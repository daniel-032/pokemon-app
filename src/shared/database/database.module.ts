import { Module, OnModuleInit } from '@nestjs/common';
import { AppDataSourceOptions } from './data-source.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSourceOptions)
  ]
})
export class DatabaseModule {}
