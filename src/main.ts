import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import { TypeormStore } from 'connect-typeorm/out';
import { DataSource } from 'typeorm';
import { Session } from './domain/auth/entities/session.entity';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);
  const sessionRepository = dataSource.getRepository(Session);

  app.use(
    session({
      secret: process.env.AUTH_SECRET_SESSION!,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 900000, httpOnly: true },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
