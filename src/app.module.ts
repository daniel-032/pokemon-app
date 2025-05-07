import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { TypeModule } from './domain/type/type.module';
import { PokemonModule } from './domain/pokemon/pokemon.module';
import { TrainerModule } from './domain/trainer/trainer.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
    }),
    DatabaseModule,
    TypeModule,
    PokemonModule,
    TrainerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
