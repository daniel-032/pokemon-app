import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { TypeModule } from './domain/type/type.module';
import { PokemonModule } from './domain/pokemon/pokemon.module';
import { TrainerModule } from './domain/trainer/trainer.module';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    DatabaseModule,
    TypeModule,
    PokemonModule,
    TrainerModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
