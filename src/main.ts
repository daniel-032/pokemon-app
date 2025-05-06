import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { ReflectionService } from '@grpc/reflection';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const grpcApp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'trainerproto',
      protoPath: join(__dirname, './../proto/trainer.proto'),
      url: `${process.env.GPRC_HOST}:${process.env.GPRC_PORT}`,
      onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await grpcApp.listen();
}

bootstrap();
