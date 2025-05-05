// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { Session } from './entities/session.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session]), JwtModule.register({
    secret: process.env.JWT_SECRET || 'jwt_secret_key',
    signOptions: { expiresIn: '7d' },
  }), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, SessionAuthGuard, JwtStrategy],
  exports: [AuthService, SessionAuthGuard],
})
export class AuthModule {}
