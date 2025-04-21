import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const pathEntities = __dirname + './../../domain/**/**/*.entity{.js,.ts}';
const pathMigrations = __dirname + '/../migrations/*{.ts,.js}';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [pathEntities],
  migrations: [pathMigrations],
  synchronize: false,
  logging: true,
});
